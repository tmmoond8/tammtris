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
      gameGroundData: gameData,
      playerBlocks: nextPlayerBlocks
    }
  }

  itemBlocks = {

  }

  blockStop = (state) => {
    const { gameGroundData } = state;
    let nextGameData = gameGroundData.filter(line => line.includes(block.EMPTY));
    const removedGameData = gameGroundData.filter(line => !line.includes(block.EMPTY));
    const removedItemBlock = removedGameData.reduce((accum, line) => accum.concat(line), []).filter(item => item > 10);
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
      itemBlocks: removedItemBlock,
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