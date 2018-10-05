import sShape from 'models/shapes/sShape';
import stickShape from 'models/shapes/stickShape';
import zShape from 'models/shapes/zShape';
import squareShape from 'models/shapes/squareShape';
import tankShape from 'models/shapes/tankShape';
import ganaShape from 'models/shapes/ganaShape';
import noogooShape from 'models/shapes/noogooShape';
import emptyShape from 'models/shapes/emptyShape';

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