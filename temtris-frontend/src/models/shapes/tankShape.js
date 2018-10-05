import block from './block';

class tankShape {
  static DEFAULT_X = 4;
  static DEFAULT_Y = 1;
  static BLOCK_COLOR = block.GREEN;
  static ROTATION_STATUS = ['right', 'up', 'left', 'down'];

  constructor(x, y) {
    this.baseBlock = new block(x || tankShape.DEFAULT_X, y || tankShape.DEFAULT_Y, tankShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  getShape() {
    const rotation = this.rotationACC % tankShape.ROTATION_STATUS.length;
    if( rotation === 0) {
      return this.getRightShape();
    } else if (rotation === 1) {
      return this.getUpShape();
    } else if (rotation === 2) {
      return this.getLeftShape();
    } else if (rotation === 3) {
      return this.getDownShape();
    }
  }

  getRightShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x, y -1, tankShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, tankShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, tankShape.BLOCK_COLOR));
    return verticle;
  }

  getLeftShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x, y -1, tankShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, tankShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, tankShape.BLOCK_COLOR));
    return verticle;
  }

  getUpShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, tankShape.BLOCK_COLOR));
    return verticle;
  }

  getDownShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, tankShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, tankShape.BLOCK_COLOR));
    return verticle;
  }
}

export default tankShape;