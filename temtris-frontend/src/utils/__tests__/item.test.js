import ItemDataManager from '../itemDataManager';
import { expect } from 'chai';


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
      const itemDots = itemDataManager.getRandomDots(matrix, 3);
      itemDots.forEach(dot => {
        expect(1).to.equal(matrix[dot.y][dot.x]);
      })
    }
  });

  it('getRandomDot', () => {
    const matrix = getMatrix();
    let dot  = itemDataManager.getRandomDot(matrix, 19);
    expect(1).to.equal(matrix[dot.y][dot.x]);
    dot  = itemDataManager.getRandomDot(matrix, 18);
    expect(1).to.equal(matrix[dot.y][dot.x]);
    dot  = itemDataManager.getRandomDot(matrix, 17);
    expect(1).to.equal(matrix[dot.y][dot.x]);
    expect(null).to.equal(itemDataManager.getRandomDot(matrix, 1));
    expect(null).to.equal(itemDataManager.getRandomDot(matrix, 2));
    expect(null).to.equal(itemDataManager.getRandomDot(matrix, 5));
    expect(null).to.equal(itemDataManager.getRandomDot(matrix, 11));
  });
});