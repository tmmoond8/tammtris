import block from '../models/block';
import shapeDataManager from './shapeDataManager';

class GameDataManager {
  static SIZE_X = 10;
  static SIZE_Y = 20;

  static GAME_STATE = {
    READY: 'READY',
    PLAY: 'PLAY',
    GAME_OVER: 'GAME_OVER'
  }

  static gamePlay = (function() {
    let gameState = GameDataManager.GAME_STATE.GAME_READY;
    let gameLoop;
    return {
      play: (autoDown) => {
        if(gameState !== GameDataManager.GAME_STATE.PLAY) {
          gameState = GameDataManager.GAME_STATE.PLAY;
          gameLoop = setInterval(autoDown, 500);
        }
      },
      stop: () => {
        clearInterval(gameLoop);
      }
    }
  })()

   static handleArrowKey = (state, playerBlocksFunc, stopCallback) => {
     const { gameGroundData, playerBlocks } = state;
    const gameData = gameGroundData.map(line => line.map(dot => dot));
    playerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = block.EMPTY;
    });

    const nextPlayerBlocks = playerBlocksFunc(playerBlocks);
    
    for (const item of nextPlayerBlocks.getShape()) {
      let { x, y } = item;
      if(x < 0 || x >= GameDataManager.SIZE_X || y < 0 || y >= GameDataManager.SIZE_Y || gameData[y][x] !== block.EMPTY ) {
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

  static blockStop = (state) => { 
    const { gameGroundData } = state;
    let nextGameData = gameGroundData.map(line => {
      if(line.includes(block.EMPTY)) {
        return line.map(dot => dot)
      } else {
        return null;
      }
    });
    nextGameData = nextGameData.filter(item => item !== null);
    while(nextGameData.length < GameDataManager.SIZE_Y) {
      nextGameData.unshift(GameDataManager.defaultLine());
    }

    const nextPlayerBlocks = shapeDataManager.getRandomShape();
    let gameState = GameDataManager.GAME_STATE.PLAY;
    nextPlayerBlocks.getShape().forEach(item => {
      if(nextGameData[item.y][item.x] !== block.EMPTY) {
        gameState = GameDataManager.GAME_STATE.GAME_OVER;
        GameDataManager.gamePlay.stop();
      }
      nextGameData[item.y][item.x] = item.dot;
    });
    return {
      gameGroundData: nextGameData,
      playerBlocks: nextPlayerBlocks,
      downStop: true, 
      gameState
    }
  }

  static handleKeyPress(key, state) {
    
    switch(key) {
      case 'ArrowLeft': 
        return GameDataManager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x - 1});
          return nextPlayerBlocks;
        });
      case 'ArrowRight':
        return GameDataManager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x + 1});
          return nextPlayerBlocks;
        });
      case 'ArrowUp':
        return GameDataManager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.rotationACC++;
          return nextPlayerBlocks;
        });
      case 'ArrowDown':
        return GameDataManager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
          return nextPlayerBlocks;
        }, GameDataManager.blockStop);
      case 'Space':
        const moveDown = (state) => {
          return GameDataManager.handleArrowKey(state, (_playerBlocks) => {          
            const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
            nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
            return nextPlayerBlocks;
          }, GameDataManager.blockStop)
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

  static defaultLine() {
    return ' '.repeat(GameDataManager.SIZE_X).split('').map( item => block.EMPTY);
  }
  static defaultGameData() {
    return ' '.repeat(GameDataManager.SIZE_Y).split('').map( item => GameDataManager.defaultLine());
  }
}

export default GameDataManager;