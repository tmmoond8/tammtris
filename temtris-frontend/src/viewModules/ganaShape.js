import block from './block';

class ganaShape {
  static DEFAULT_X = 4;
  static DEFAULT_Y = 2;
  static BLOCK_COLOR = block.BLACK;
  static ROTATION_STATUS = ['up', 'left', 'down', 'right'];

  constructor(x, y) {
    this.baseBlock = new block(x || ganaShape.DEFAULT_X, y || ganaShape.DEFAULT_Y, ganaShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  getShape() {
    const rotation = this.rotationACC % ganaShape.ROTATION_STATUS.length;
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
    verticle.push(new block(x, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x + 2, y, ganaShape.BLOCK_COLOR));
    return verticle;
  }

  getDownShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 2, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, ganaShape.BLOCK_COLOR));
    return verticle;
  }

  getUpShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 2, ganaShape.BLOCK_COLOR));
    return verticle;
  }

  getLeftShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x - 2, y, ganaShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, ganaShape.BLOCK_COLOR));
    return verticle;
  }
}

export default ganaShape;