import ItemDataManager from '../itemDataManager';
import { expect } from 'chai';
import block from 'models/shapes/block';


const itemDataManager = new ItemDataManager();

const mapData = 
     `0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      1|0|1|0|1|0|1|0|1|0
      0|1|0|1|0|1|0|1|0|0
      0|0|1|0|1|0|1|0|0|0
      0|0|0|1|0|1|0|0|0|0`;

const coreMapDat = mapData.replace(/ /g, '').split(String.fromCharCode(10))
                  .map(line => line.split('|'));
const getMatrix = () => coreMapDat.map(line => (line.map(item => parseInt(item, 10))));

describe('itemDataManager', () => {
  it('getBombMap 검증', () => {
    const bombs = itemDataManager.getBombMap().getShape();
    expect(53).to.equal(bombs.length)

    const bomb = bombs[3];
    expect(4).to.equal(bomb.x);
    expect(8).to.equal(bomb.y);
    expect(1).to.equal(bomb.dot);
  });

  it('getRandomDots', () => {
    let matrix = getMatrix();
    expect(20).to.equal(matrix.length);
    expect(10).to.equal(matrix[0].length);

    for(let i = 0; i < 10; i++) {
      matrix = getMatrix();
      const itemDots = ItemDataManager.getRandomDots(matrix, 3);
      itemDots.forEach(dot => {
        expect(1).to.equal(matrix[dot.y][dot.x]);
      })
    }
  });

  it('getRandomDot', () => {
    const matrix = getMatrix();
    let dot  = ItemDataManager.getRandomDot(matrix, 19);
    expect(1).to.equal(matrix[dot.y][dot.x]);
    dot  = ItemDataManager.getRandomDot(matrix, 18);
    expect(1).to.equal(matrix[dot.y][dot.x]);
    dot  = ItemDataManager.getRandomDot(matrix, 17);
    expect(1).to.equal(matrix[dot.y][dot.x]);
    expect(null).to.equal(ItemDataManager.getRandomDot(matrix, 1));
    expect(null).to.equal(ItemDataManager.getRandomDot(matrix, 2));
    expect(null).to.equal(ItemDataManager.getRandomDot(matrix, 5));
    expect(null).to.equal(ItemDataManager.getRandomDot(matrix, 11));
  });

  it('getRandomItem', () => {
    const compose = (...fn) => {
      if(fn.length === 0) return (input) => input;
      return (input) => fn.reduce((accm, currentFn) => currentFn(accm), input)
    }
    const rand = (input, per) => { 
      if (input !== block.EMPTY) return input;
      return (Math.random() * 100) < per
    };
    const done = (input) => input !== block.EMPTY;
    const bomb = (input) => done(input) ? input : rand(input, 5) ? block.ITEM_BOMB : input;
    const cleaner = (input) => done(input) ? input : rand(input, 5) ? block.ITEM_CLEANER : input;
    const upDown = (input) => {
      if (input !== block.EMPTY) {
        return input
      };
      const per = Math.random() * 100;
      if(per < 25) return block.ITEM_UP1;
      if(per < 50) return block.ITEM_DOWN1;
      if(per < 75) return block.ITEM_UP2;
      if(per < 100) return block.ITEM_DOWN2;
      return block.EMPTY;
    };

    const ranomItemsBox = compose(bomb, cleaner, upDown);
    for(let i =0; i < 100; i++) {
      ranomItemsBox(0)
    }
  })
});