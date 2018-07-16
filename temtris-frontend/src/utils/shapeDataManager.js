import sShape from '../models/sShape';
import stickShape from '../models/stickShape';
import zShape from '../models/zShape';
import squareShape from '../models/squareShape';
import tankShape from '../models/tankShape';
import ganaShape from '../models/ganaShape';
import noogooShape from '../models/noogooShape';

class shapeDataManager {
  constructor() {}
  static shapes = [
    sShape, stickShape, zShape, squareShape, tankShape, ganaShape, noogooShape
  ]
  static getRandomShape() {
    return new shapeDataManager.shapes[Math.floor(Math.random()*2147483647 % shapeDataManager.shapes.length)]
  }
}

export default shapeDataManager;