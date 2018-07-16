import block from '../models/block';
import shapeDataManager from './shapeDataManager';

class GameDatamanager {
  constructor() {
    this.sizeX = 10;
    this.sizeY = 19;
    this.gameData = GameDatamanager.defaultGameData();
    this.playerBlocks;
  }

  bind(playGroundComponent) {
    this.playGroundComponent = playGroundComponent;
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
        if(x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY || gameData[y][x] !== block.EMPTY ) {
          stopCallback && stopCallback();
          return;
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
    
    switch(key) {
      case 'ArrowLeft': 
        handleArrowKey(playerBlocks, (playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(playerBlocks.baseBlock), {x: nextPlayerBlocks.baseBlock.x - 1});
          return nextPlayerBlocks;
        });
        break;
      case 'ArrowRight':
        handleArrowKey(playerBlocks, (playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(playerBlocks.baseBlock), {x: nextPlayerBlocks.baseBlock.x + 1});
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
        handleArrowKey(playerBlocks, (playerBlocks) => {          
          const nextPlayerBlocks = Object.deepCopy(playerBlocks);
          nextPlayerBlocks.baseBlock = Object.assign(Object.create(playerBlocks.baseBlock), {y: nextPlayerBlocks.baseBlock.y + 1});
          return nextPlayerBlocks;
        }, () => { this.playGroundComponent.setState({playerBlocks: shapeDataManager.getRandomShape()})});
        break;
      default:
        break;
    }
  }

  getGameData() {
    return this.gameData;
  }

  setGameData(gameData) {
    this.gameData = gameData;
    this.playGroundComponent.setState({
      gameData: gameData
    })
  }

  static defaultLine() {
    return '1234567890'.split('').map( item => block.EMPTY);
  }
  static defaultGameData() {
    return '1234567890123456789'.split('').map( item => GameDatamanager.defaultLine());
  }
}

export default GameDatamanager;