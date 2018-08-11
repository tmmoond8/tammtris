import sShape from '../models/sShape';
import stickShape from '../models/stickShape';
import zShape from '../models/zShape';
import squareShape from '../models/squareShape';
import tankShape from '../models/tankShape';
import ganaShape from '../models/ganaShape';
import noogooShape from '../models/noogooShape';
import emptyShape from '../models/emptyShape';

class shapeDataManager {
  static shapes = [
    sShape, stickShape, zShape, squareShape, tankShape, ganaShape, noogooShape
  ]
  static getRandomShape() {
    return new shapeDataManager.shapes[Math.floor(Math.random()*2147483647 % shapeDataManager.shapes.length)]
  }

  static getEmptyShape() {
    return new emptyShape();
  }

  static equals(a, b) {
    return (a.constructor.name === b.constructor.name && a.baseBlock.x === b.baseBlock.x && a.baseBlock.y === b.baseBlock.y)
  }
}

export default shapeDataManager;