import block from '../models/block';
import shapeDataManager from './shapeDataManager';

class GameDatamanager {
  static SIZE_X = 10;
  static SIZE_Y = 20;

  constructor() {
    this.gameData = GameDatamanager.defaultGameData();
    this.playerBlocks = [];
    this.gameLoop;
  }

  bind(playGroundComponent) {
    this.playGroundComponent = playGroundComponent;
  }

  play(handleArrowKey, blockStop) {
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

  handleKeyPress(key, playerBlocks) {
    const handleArrowKey = (playerBlocks, playerBlocksFunc, stopCallback) => {
      const gameData = this.gameData.map(line => line.map(dot => dot));
      playerBlocks.getShape().forEach(item => {
        gameData[item.y][item.x] = block.EMPTY;
      });

      const nextPlayerBlocks = playerBlocksFunc(playerBlocks);
      
      for (const item of nextPlayerBlocks.getShape()) {
        let { x, y } = item;
        if(x < 0 || x >= GameDatamanager.SIZE_X || y < 0 || y >= GameDatamanager.SIZE_Y || gameData[y][x] !== block.EMPTY ) {
          stopCallback && stopCallback();
          return true;
        }
      }

      nextPlayerBlocks.getShape().forEach(item => {
        gameData[item.y][item.x] = item.dot;
      })

      this.gameData = gameData;
      this.playerBlocks = nextPlayerBlocks;
      this.playGroundComponent.setState({
        gameData: gameData,
        playerBlocks: nextPlayerBlocks
      })
    }

    const blockStop = () => { 
      let gameData = this.gameData.map(line => {
        if(line.includes(block.EMPTY)) {
          return line.map(dot => dot)
        } else {
          return null;
        }
      });
      gameData = gameData.filter(item => item !== null);
      while(gameData.length < GameDatamanager.SIZE_Y) {
        gameData.unshift(GameDatamanager.defaultLine());
      }

      const playerBlocks = shapeDataManager.getRandomShape();
      playerBlocks.getShape().forEach(item => {
        gameData[item.y][item.x] = item.dot;
      });

      this.gameData = gameData;
      this.playerBlocks = playerBlocks;
      this.playGroundComponent.setState({
        gameData: gameData,
        playerBlocks: playerBlocks
      }
    )}

    this.play(handleArrowKey, blockStop);
    
    switch(key) {
      case 'ArrowLeft': 
        handleArrowKey(playerBlocks, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(_playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x - 1});
          return nextPlayerBlocks;
        });
        break;
      case 'ArrowRight':
        handleArrowKey(playerBlocks, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(_playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, x: _playerBlocks.baseBlock.x + 1});
          return nextPlayerBlocks;
        });
        break;
      case 'ArrowUp':
        handleArrowKey(playerBlocks, (playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(playerBlocks);
          nextPlayerBlocks.rotationACC++;
          return nextPlayerBlocks;
        });
        break;
      case 'ArrowDown':
        handleArrowKey(playerBlocks, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(_playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
          return nextPlayerBlocks;
        }, blockStop);
        break;
      case 'Space':
        while(!handleArrowKey(playerBlocks, (_playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(_playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(_playerBlocks.baseBlock), {..._playerBlocks.baseBlock, y: _playerBlocks.baseBlock.y + 1});
          playerBlocks = nextPlayerBlocks;
          return nextPlayerBlocks;
        }, blockStop));
        break;
      default:
        break;
    }
  }

  setGameData(gameData) {
    this.gameData = gameData;
    this.playGroundComponent.setState({
      gameData: gameData
    })
  }

  static defaultLine() {
    return ' '.repeat(GameDatamanager.SIZE_X).split('').map( item => block.EMPTY);
  }
  static defaultGameData() {
    return ' '.repeat(GameDatamanager.SIZE_Y).split('').map( item => GameDatamanager.defaultLine());
  }
}

export default GameDatamanager;