import sShape from '../viewModules/sShape';
import stickShape from '../viewModules/stickShape';
import zShape from '../viewModules/zShape';
import squareShape from '../viewModules/squareShape';
import tankShape from '../viewModules/tankShape';
import ganaShape from '../viewModules/ganaShape';
import noogooShape from '../viewModules/noogooShape';

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