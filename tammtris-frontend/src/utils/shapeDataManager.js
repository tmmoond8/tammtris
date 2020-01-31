import sShape from '../models/shapes/sShape';
import stickShape from '../models/shapes/stickShape';
import zShape from '../models/shapes/zShape';
import squareShape from '../models/shapes/squareShape';
import tankShape from '../models/shapes/tankShape';
import ganaShape from '../models/shapes/ganaShape';
import noogooShape from '../models/shapes/noogooShape';
import emptyShape from '../models/shapes/emptyShape';

class shapeDataManager {
  static randomShapeQueue = [];
  static shapes = [
    sShape, stickShape, zShape, squareShape, tankShape, ganaShape, noogooShape
  ]
  static getNextBlocks() {
    if (shapeDataManager.randomShapeQueue.length < 5) {
      for(let i = 0; i < 100; i++) {
        shapeDataManager. randomShapeQueue.push(new shapeDataManager.shapes[Math.floor(Math.random()*2147483647 % shapeDataManager.shapes.length)]);
      }
    }
    return {
      playerBlocks: shapeDataManager.randomShapeQueue.shift(),
      nextBlocks: shapeDataManager.randomShapeQueue.slice(0, 2)
    }
  }

  static getEmptyShape() {
    return new emptyShape();
  }

  static equals(a, b) {
    return (a.constructor.name === b.constructor.name && a.baseBlock.x === b.baseBlock.x && a.baseBlock.y === b.baseBlock.y)
  }
}

export default shapeDataManager;