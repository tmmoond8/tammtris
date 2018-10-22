import block from 'models/shapes/block';
import shapeDataManager from './shapeDataManager';

const GAME_STATE = {
  READY: 'READY',
  PLAY: 'PLAY',
  GAME_OVER: 'GAME_OVER'
}

const SIZE_X = 10;
const SIZE_Y = 20;

class GameDataManager {

  static defaultLine() {
    return ' '.repeat(SIZE_X).split('').map( item => block.EMPTY);
  }
  static defaultGameData() {
    return' '.repeat(SIZE_Y).split('').map( item => GameDataManager.defaultLine());
  }
  static mergePlayerBlocks(gameData, playerBlocks) {
    playerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = item.dot;
    });
  }

  static clearPlayerBlocks(gameData, playerBlocks) {
    playerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = block.EMPTY;
    });
  }

  static cloneGameGroundData(gameGroundData) {
    return JSON.parse(JSON.stringify(gameGroundData));
  }

  gamePlay = (function() {
    let gameLoop;
    return {
      play: (autoDown, gameState) => {
        const readyState = [GAME_STATE.READY, GAME_STATE.GAME_OVER]
        if(readyState.includes(gameState)) {
          gameState = GAME_STATE.PLAY;
          gameLoop = setInterval(autoDown, 500);
        }
        return gameState;
      },
      stop: () => {
        clearInterval(gameLoop);
      }
    }
  })();

  addItems(gameItems=[], newItems) {
    return gameItems.filter(item => item > 10).concat(newItems)
             .concat('a'.repeat(10).split('').map(item => 0)).splice(0, 10)
  }

  removeItem(gameItems) {
    console.log('removeItem', gameItems);
    return gameItems.splice(1, 9).concat([0]);
  }

  handleItemUse = (() => {
    const upLine = 'a'.repeat(10).split('').map((item, idx) => idx === 4 ? 0 : 8);
    const targetTo = (to, me) => to === me;
    const fromMe = (from, me) => from === me;
    const up = (gameGroundData, playerBlocks, number) => {
      GameDataManager.clearPlayerBlocks(gameGroundData, playerBlocks);
      for(let i = 0; i < number; i++) {
        gameGroundData.push(upLine);
        gameGroundData.shift();
      };
      GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
      return gameGroundData;
    }
    const up1 = (gameGroundData, playerBlocks, to, me) => {
      console.log('up1');
      return targetTo(to, me) ? up(gameGroundData, playerBlocks, 1) : null;
    }
    const up2 = (gameGroundData, playerBlocks, to, me) => {
      return targetTo(to, me) ? up(gameGroundData, playerBlocks, 2) : null;
    }
    return ({ gameGroundData, playerBlocks, gameItems }, { from , to, item, me }) => {
      const gameData = GameDataManager.cloneGameGroundData(gameGroundData);
      let processCall;
      switch(item) {
        case block.ITEM_UP1: 
          processCall = () => up1(gameData, playerBlocks, to, me);
          break;
        case block.ITEM_UP2: 
          processCall = () => up2(gameData, playerBlocks, to, me);
          break;
      }
      return {
        gameGroundData: typeof processCall === 'function' ? processCall() : null,
        gameItems: fromMe(from, me) ? this.removeItem(gameItems) : gameItems
      }
    }
  })()

  handleArrowKey = (state, playerBlocksFunc, stopCallback) => {
    const { gameGroundData, playerBlocks } = state;
    const gameData = gameGroundData.map(line => line.map(dot => dot));
    playerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = block.EMPTY;
    });

    const nextPlayerBlocks = playerBlocksFunc(playerBlocks);
    
    for (const item of nextPlayerBlocks.getShape()) {
      let { x, y } = item;
      if(x < 0 || x >= SIZE_X || y < 0 || y >= SIZE_Y || gameData[y][x] !== block.EMPTY ) {
        return stopCallback ? stopCallback(state) : { gameGroundData, playerBlocks };
      }
    }

    nextPlayerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = item.dot;
    })

    return {
      ...state,
      downStop: false, 
      gameGroundData: gameData,
      playerBlocks: nextPlayerBlocks
    }
  }
  blockStop = (state) => {
    const { gameGroundData, gameItems } = state;
    let nextGameData = gameGroundData.filter(line => line.includes(block.EMPTY));
    const removedGameData = gameGroundData.filter(line => !line.includes(block.EMPTY));
    const removedItemBlock = removedGameData.reduce((accum, line) => accum.concat(line), []).filter(item => item > 10);
    const nextGameItems = this.addItems(gameItems, removedItemBlock);

    while(nextGameData.length < SIZE_Y) {
      // 여기에 아이템 블럭을 넣을 수 있겠다.
      nextGameData.unshift(GameDataManager.defaultLine());
    }

    const { playerBlocks, nextBlocks } = shapeDataManager.getNextBlocks();
    let gameState = GAME_STATE.PLAY;
    playerBlocks.getShape().forEach(item => {
      if(nextGameData[item.y][item.x] !== block.EMPTY) {
        gameState = GAME_STATE.GAME_OVER;
        this.gamePlay.stop();
      }
      nextGameData[item.y][item.x] = item.dot;
    });
    return {
      gameGroundData: nextGameData,
      playerBlocks,
      downStop: true, 
      gameState,
      nextBlocks,
      gameItems : nextGameItems,
    }
  }

  handleKeyPress(key, state) {
    switch(key) {
      case 'ArrowLeft': 
        return this.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x - 1});
          return nextPlayerBlocks;
        });
      case 'ArrowRight':
        return this.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x + 1});
          return nextPlayerBlocks;
        });
      case 'ArrowUp':
        return this.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.rotationACC++;
          return nextPlayerBlocks;
        });
      case 'ArrowDown':
        return this.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
          return nextPlayerBlocks;
        }, this.blockStop);
      case 'Space':
        const moveDown = (state) => {
          return this.handleArrowKey(state, (_playerBlocks) => {          
            const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
            nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
            return nextPlayerBlocks;
          }, this.blockStop)
        }
        let nextState = state;
        while(true) {
          nextState = moveDown(nextState);
          if(nextState.downStop) {
            return nextState;
          }
        }
      default:
        return state;
    }
  }
}

export default GameDataManager;
export { GAME_STATE }