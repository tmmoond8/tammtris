import block from './block';

class noogooShape {
  static DEFAULT_X = 5;
  static DEFAULT_Y = 2;
  static BLOCK_COLOR = block.YELLOW;
  static ROTATION_STATUS = ['up', 'left', 'down', 'right'];

  constructor(x, y) {
    this.baseBlock = new block(x || noogooShape.DEFAULT_X, y || noogooShape.DEFAULT_Y, noogooShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  getShape() {
    const rotation = this.rotationACC % noogooShape.ROTATION_STATUS.length;
    if( rotation === 0) {
      return this.getUpShape();
    } else if (rotation === 1) {
      return this.getLeftShape();
    } else if (rotation === 2) {
      return this.getDownShape();
    } else if (rotation === 3) {
      return this.getRightShape();
    }
  }

  getRightShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x + 2, y, noogooShape.BLOCK_COLOR));
    return verticle;
  }

  getDownShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 2, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, noogooShape.BLOCK_COLOR));
    return verticle;
  }

  getUpShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 2, noogooShape.BLOCK_COLOR));
    return verticle;
  }

  getLeftShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x - 2, y, noogooShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, noogooShape.BLOCK_COLOR));
    return verticle;
  }
}

export default noogooShape;