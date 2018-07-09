import DotBlock from '../components/DotBlock';

class GameDatamanager {
  constructor() {
    this.sizeX = 10;
    this.sizeY = 19;
    this.gameData = '1234567890123456789'.split('').map( item => GameDatamanager.defaultLine())
    this.playerBlocks = []
  }

  bind(playGroundComponent) {
    this.playGroundComponent = playGroundComponent;
  }

  handleKeyPress(key, playerBlocks) {
    const handleArrow = (playerBlocks, fn) => {
      const gameData = this.gameData.map(line => line.map(dot => dot));;    
      let nextPlayerBlocks = playerBlocks.map(item => {
        let { xIdx, yIdx, dot } = fn(item);
        if(xIdx < 0 || xIdx >= this.sizeX || yIdx < 0 || yIdx >= this.sizeY || gameData[yIdx][xIdx] !== DotBlock.EMPTY ) {
          return undefined;
        }
        gameData[yIdx][xIdx] = dot;
        gameData[item.yIdx][item.xIdx] = DotBlock.EMPTY;
        return fn(item);
      });
      if(nextPlayerBlocks.includes(undefined)) {
        return;
      }
      this.gameData = gameData;
      this.playerBlocks = nextPlayerBlocks;
      this.playGroundComponent.setState({
        gameData: gameData,
        playerBlocks: nextPlayerBlocks
      })
    }

    switch(key) {
      case 'ArrowLeft': 
        handleArrow(playerBlocks, (block) => {
          return {...block, xIdx: block.xIdx - 1}
        });
        break;
      case 'ArrowRight':
        handleArrow(playerBlocks, (block) => {
          return {...block, xIdx: block.xIdx + 1}
        });
        break;
      case 'ArrowDown':
        handleArrow(playerBlocks, (block) => {
          return {...block, yIdx: block.yIdx + 1}
        });
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
    return '1234567890'.split('').map( item => DotBlock.EMPTY);
  }
}

export default GameDatamanager;