import block from 'models/shapes/block';
import GameDataManager from './gameDataManager';

const SIZE_X = 10;

class ItemDataManager {
  getBombMap() {
    const mapData = 
     `0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|1|0|1|0|0|0|0
      0|0|1|0|1|0|1|0|0|0
      0|1|0|1|0|1|0|1|0|0
      1|0|1|0|1|0|1|0|1|0
      0|1|0|1|0|1|0|1|0|1
      1|0|1|0|1|0|1|0|1|0
      0|1|0|1|0|1|0|1|0|1
      1|0|1|0|1|0|1|0|1|0
      0|1|0|1|0|1|0|1|0|1
      1|0|1|0|1|0|1|0|1|0
      0|1|0|1|0|1|0|1|0|0
      0|0|1|0|1|0|1|0|0|0
      0|0|0|1|0|1|0|0|0|0`;

    const coreMapDat = mapData.replace(/ /g, '').split(String.fromCharCode(10))
                      .map(line => line.split('|'));
    const matrix = coreMapDat.map(line => (line.map(item => parseInt(item, 10))));
    const bombs = [];
    for(let i = 0; i < matrix.length; i++) {
      for(let j = 0; j < matrix[0].length; j++) {
        if(matrix[i][j] === 1) bombs.push({ dot: 1, y: i, x: j});
      }
    }
    return {
      getShape: () => bombs
    };
  }

  static addItems(gameItems=[], gameGroundData) {
    const removedGameData = gameGroundData.filter(line => !line.includes(block.EMPTY));
    const removedItemBlock = removedGameData.reduce((accum, line) => accum.concat(line), []).filter(item => item > 10);
    const remainder = gameGroundData.filter(line => line.includes(block.EMPTY));
    return {
      nextGameItems: gameItems.filter(item => item > 10).concat(removedItemBlock)
      .concat('a'.repeat(SIZE_X).split('').map(item => 0)).splice(0, SIZE_X),
      nextGameData: remainder
    }
  }

  getRandomDots = (gameGroundData, number) => {
    const dots = [];
    const data = GameDataManager.cloneGameGroundData(gameGroundData);
    let keys = data.map((item, idx) => idx);
    while(dots.length < number && keys.length > 0) {
      let randomKey = keys[this.getRandomIndex(keys)];
      let dot = this.getRandomDot(data, randomKey);
      if(dot === null) {
        keys = keys.filter((item) => item !== randomKey);
      } else {
        data[dot.y][dot.x] = 0;
        dots.push(dot);
      }
    }
    
    return dots;
  }
  getRandomIndex = (items) => Math.floor(Math.random() * items.length);

  getRandomDot = (gameGroundData, y) => {
    const selectedLine = gameGroundData[y];
    const randomIndex = this.getRandomIndex(selectedLine)
    let pick, idx;
    for(let i = 0; i < 10; i++) {
      idx = (randomIndex + i) % 10
      if(selectedLine[idx] < 10 && selectedLine[idx] !== 0) {
        pick = selectedLine[idx];
        break;
      }
    }
    if(!pick) return null;
    return { x: idx, y };
  }

  removeItem(gameItems) {
    return gameItems.splice(1, 9).concat([0]);
  }

  mergeBombMap(gameData, playerBlocks) {
    playerBlocks.getShape().forEach(item => {
      gameData[item.y][item.x] = block.EMPTY;
    });
  }

  handleItemUse = (() => {
    const upLine = 'a'.repeat(SIZE_X).split('').map((item, idx) => idx === 4 ? 0 : 8);
    const targetTo = (to, me) => to === me;
    const fromMe = (from, me) => from === me;

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
        up2: (gameGroundData, playerBlocks) => {
          return up(gameGroundData, playerBlocks, 2);
        },
      }
    })();

    const downer = (() => {
      const down = (gameGroundData, playerBlocks, number) => {
        GameDataManager.clearPlayerBlocks(gameGroundData, playerBlocks);
        for(let i = 0; i < number; i++) {
          gameGroundData.unshift('a'.repeat(SIZE_X).split('').map((item, idx) => block.EMPTY));
          gameGroundData.pop();
        };
        GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
        return gameGroundData;
      }
      return {
        down1: (gameGroundData, playerBlocks) => {
          return down(gameGroundData, playerBlocks, 1);
        },
        down2: (gameGroundData, playerBlocks) => {
          return down(gameGroundData, playerBlocks, 2);
        },
      }
    })();

    const cleaner = (gameGroundData, playerBlocks) => {
      GameDataManager.clearPlayerBlocks(gameGroundData, playerBlocks);
      gameGroundData = GameDataManager.defaultGameData();
      GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
      return gameGroundData;
    }

    const bomb = (gameGroundData, playerBlocks) => {
      GameDataManager.clearPlayerBlocks(gameGroundData, playerBlocks);
      this.mergeBombMap(gameGroundData, this.getBombMap());
      GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
      return gameGroundData;
    }

    return ({ gameGroundData, playerBlocks, gameItems }, { from , to, item, me }) => {
      const gameData = GameDataManager.cloneGameGroundData(gameGroundData);
      const itemUse = {
        [block.ITEM_UP1]: () => upper.up1(gameData, playerBlocks),
        [block.ITEM_UP2]: () => upper.up2(gameData, playerBlocks),
        [block.ITEM_DOWN1]: () => downer.down1(gameData, playerBlocks),
        [block.ITEM_DOWN2]: () => downer.down2(gameData, playerBlocks),
        [block.ITEM_CLEANER]: () => cleaner(gameData, playerBlocks),
        [block.ITEM_BOMB]: () => bomb(gameData, playerBlocks),
      }

      return {
        gameGroundData: targetTo(to, me) && itemUse[item] ? itemUse[item]() : null,
        gameItems: fromMe(from, me) ? this.removeItem(gameItems) : gameItems
      }
    }
  })()
}

export default ItemDataManager;