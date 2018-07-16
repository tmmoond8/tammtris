import block from './block';

class stickShape {
  static DEFAULT_X = 4;
  static DEFAULT_Y = 0;
  static BLOCK_COLOR = block.BLACK;
  static ROTATION_STATUS = ['horizen', 'verticle'];

  constructor(x, y) {
    this.baseBlock = new block(x || stickShape.DEFAULT_X, y || stickShape.DEFAULT_Y, stickShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  getShape() {
    const rotation = this.rotationACC % stickShape.ROTATION_STATUS.length;
    if( rotation === 0) {
      return this.getHorizenShape();
    } else if (rotation === 1) {
      return this.getVerticleShape();
    }
  }

  getVerticleShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, stickShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, stickShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 2, stickShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 3, stickShape.BLOCK_COLOR));
    return verticle;
  }

  getHorizenShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, stickShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, stickShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, stickShape.BLOCK_COLOR));
    verticle.push(new block(x + 2, y, stickShape.BLOCK_COLOR));
    return verticle;
  }
}

export default stickShape;