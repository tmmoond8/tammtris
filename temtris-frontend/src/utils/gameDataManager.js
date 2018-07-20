import block from '../models/block';
import shapeDataManager from './shapeDataManager';
import * as playGroundActions from '../store/modules';

class GameDatamanager {
  static SIZE_X = 10;
  static SIZE_Y = 20;


  static play(handleArrowKey, blockStop) {
    if(this.gameLoop) {
      return;
    }
    this.gameLoop = setInterval(() => {
      let { gameData, playerBlocks } = this;
      handleArrowKey(playerBlocks, (_playerBlocks) => {          
        const nextPlayerBlocks = Object.deepCopy(_playerBlocks);
        nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
        playerBlocks = nextPlayerBlocks;
        return nextPlayerBlocks;
      }, blockStop);
    }, 500) 
  }

   static handleArrowKey = (state, playerBlocksFunc, stopCallback) => {
     const { gameGroundData, playerBlocks } = state;
    const gameData = gameGroundData.map(line => line.map(dot => dot));
    playerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = block.EMPTY;
    });

    const nextPlayerBlocks = playerBlocksFunc(playerBlocks);
    
    for (const item of nextPlayerBlocks.getShape()) {
      let { x, y } = item;
      if(x < 0 || x >= GameDatamanager.SIZE_X || y < 0 || y >= GameDatamanager.SIZE_Y || gameData[y][x] !== block.EMPTY ) {
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
    while(nextGameData.length < GameDatamanager.SIZE_Y) {
      nextGameData.unshift(GameDatamanager.defaultLine());
    }

    const nextPlayerBlocks = shapeDataManager.getRandomShape();
    nextPlayerBlocks.getShape().forEach(item => {
      nextGameData[item.y][item.x] = item.dot;
    });
    return {
      gameGroundData: nextGameData,
      playerBlocks: nextPlayerBlocks,
      downStop: true
    }
  }

  static handleKeyPress(key, state) {
    

    // this.play(handleArrowKey, blockStop);
    
    switch(key) {
      case 'ArrowLeft': 
        return GameDatamanager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x - 1});
          return nextPlayerBlocks;
        });
      case 'ArrowRight':
        return GameDatamanager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x + 1});
          return nextPlayerBlocks;
        });
      case 'ArrowUp':
        return GameDatamanager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.rotationACC++;
          return nextPlayerBlocks;
        });
      case 'ArrowDown':
        return GameDatamanager.handleArrowKey(state, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
          return nextPlayerBlocks;
        }, GameDatamanager.blockStop);
      case 'Space':
        const moveDown = (state) => {
          return GameDatamanager.handleArrowKey(state, (_playerBlocks) => {          
            const nextPlayerBlocks = Object.assign(Object.create(_playerBlocks), _playerBlocks);
            nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
            return nextPlayerBlocks;
          }, GameDatamanager.blockStop)
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
    return ' '.repeat(GameDatamanager.SIZE_X).split('').map( item => block.EMPTY);
  }
  static defaultGameData() {
    return ' '.repeat(GameDatamanager.SIZE_Y).split('').map( item => GameDatamanager.defaultLine());
  }
}

export default GameDatamanager;