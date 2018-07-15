import block from '../viewModules/block';
import shapeDataManager from './shapeDataManager';
import sShape from '../viewModules/sShape';
import stickShape from '../viewModules/stickShape';

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
    const handleMove = (playerBlocks, moveFunc, stopCallback) => {

      const gameData = this.gameData.map(line => line.map(dot => dot));
      let nextPlayerBlocks = playerBlocks.getShape().map(item => {
        gameData[item.y][item.x] = block.EMPTY;
        return moveFunc(item);
      });

      nextPlayerBlocks = nextPlayerBlocks.map(item => {
        let { x, y, dot } = item;
        if(x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY || gameData[y][x] !== block.EMPTY ) {
          return undefined;
        }
        gameData[y][x] = dot;
        return item;
      })
      if(nextPlayerBlocks.includes(undefined)) {
        stopCallback && stopCallback();
        return;
      }
      this.gameData = gameData;
      this.playerBlocks = Object.deepCopy(playerBlocks);
      this.playerBlocks.baseBlock = Object.assign(Object.create(playerBlocks.baseBlock), moveFunc(playerBlocks.baseBlock));
      this.playGroundComponent.setState({
        gameData: gameData,
        playerBlocks: this.playerBlocks
      })
    }

    const handleRotation = (playerBlocks) => {
      const gameData = this.gameData.map(line => line.map(dot => dot));
      playerBlocks.getShape().forEach(item => {
        gameData[item.y][item.x] = block.EMPTY;
      });
      const nextPlayerBlocks = Object.deepCopy(playerBlocks);
      nextPlayerBlocks.rotationACC++;

      nextPlayerBlocks.getShape().forEach(item => {
        gameData[item.y][item.x] = item.dot;
      });
      this.gameData = gameData;
      this.playerBlocks = nextPlayerBlocks;
      this.playGroundComponent.setState({
        gameData: gameData,
        playerBlocks: nextPlayerBlocks
      })
    }

    switch(key) {
      case 'ArrowLeft': 
        handleMove(playerBlocks, (block) => {
          return {...block, x: block.x - 1}
        });
        break;
      case 'ArrowRight':
        handleMove(playerBlocks, (block) => {
          return {...block, x: block.x + 1}
        });
        break;
      case 'ArrowUp':
        handleRotation(playerBlocks);
        break;
      case 'ArrowDown':
        handleMove(playerBlocks, (block) => {
          return {...block, y: block.y + 1}
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