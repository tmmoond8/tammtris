import block from './block';

class sShape {
  static DEFAULT_X = 4;
  static DEFAULT_Y = 1;
  static BLOCK_COLOR = block.BLACK;
  static ROTATION_STATUS = ['horizen', 'verticle'];

  constructor(x, y) {
    this.baseBlock = new block(x || sShape.DEFAULT_X, y || sShape.DEFAULT_Y, sShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  setBaseBlockPosition(x, y) {
    this.baseBlock.x = x;
    this.baseBlock.y = y;
  }

  getShape() {
    const rotation = this.rotationACC % 2;
    if( rotation === 0) {
      return this.getHorizenShape();
    } else if (rotation === 1) {
      return this.getVerticleShape();
    }
  }

  getVerticleShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x + 1, y + 1, sShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, sShape.BLOCK_COLOR));
    verticle.push(new block(x, y, sShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, sShape.BLOCK_COLOR));
    return verticle;
  }

  getHorizenShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x - 1, y + 1, sShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, sShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, sShape.BLOCK_COLOR));
    verticle.push(new block(x, y, sShape.BLOCK_COLOR));
    return verticle;
  }
}

export default sShape;