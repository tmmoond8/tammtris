import block from 'models/shapes/block';
import ShapeDataManager from './shapeDataManager';
import ItemDataManager from './itemDataManager';
import SocketClient from 'lib/SocketClient';

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
    let { nextGameItems, nextGameData } = ItemDataManager.addItems(gameItems, gameGroundData);
    ItemDataManager.mergeItems(nextGameData, 20 - nextGameData.length);
    while(nextGameData.length < SIZE_Y) {
      nextGameData.unshift(GameDataManager.defaultLine());
    }
    const removedLineLength = gameGroundData.filter(line => !line.includes(block.EMPTY)).length - 2;
    removedLineLength > 0 && SocketClient.sendMessage('game/blockUp', { removedLineLength });

    const { playerBlocks, nextBlocks } = ShapeDataManager.getNextBlocks();
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

  blockUp = (() => {
    const upLine = 'a'.repeat(SIZE_X).split('').map((item, idx) => idx === 4 ? 0 : 8);
    const upper = (() => {
      const up = (gameGroundData, playerBlocks, number) => {
        GameDataManager.clearPlayerBlocks(gameGroundData, playerBlocks);
        for(let i = 0; i < number; i++) {
          gameGroundData.push(upLine);
          gameGroundData.shift();
        };
        GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
        return gameGroundData;
      }
      return {
        up1: (gameGroundData, playerBlocks) => {
          return up(gameGroundData, playerBlocks, 1);
        },
        up3: (gameGroundData, playerBlocks) => {
          return up(gameGroundData, playerBlocks, 3);
        },
      }
    })();
    return ({ gameGroundData, playerBlocks }, removedLineLength) => {
      const gameData = GameDataManager.cloneGameGroundData(gameGroundData);
      const itemUse = [
        () => {},
        () => upper.up1(gameData, playerBlocks),
        () => upper.up3(gameData, playerBlocks)
      ];
       return {
        gameGroundData: itemUse[removedLineLength] ? itemUse[removedLineLength]() : null,
      }
    }
  })();

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