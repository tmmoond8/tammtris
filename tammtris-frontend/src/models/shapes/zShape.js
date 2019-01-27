import block from './block';

class zShape {
  static DEFAULT_X = 5;
  static DEFAULT_Y = 1;
  static BLOCK_COLOR = block.ORANGE;
  static ROTATION_STATUS = ['horizen', 'verticle'];

  constructor(x, y) {
    this.baseBlock = new block(x || zShape.DEFAULT_X, y || zShape.DEFAULT_Y, zShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  getShape() {
    const rotation = this.rotationACC % zShape.ROTATION_STATUS.length;
    if( rotation === 0) {
      return this.getHorizenShape();
    } else if (rotation === 1) {
      return this.getVerticleShape();
    }
  }

  getVerticleShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, zShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y + 1, zShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, zShape.BLOCK_COLOR));
    verticle.push(new block(x, y - 1, zShape.BLOCK_COLOR));
    return verticle;
  }

  getHorizenShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, zShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y + 1, zShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, zShape.BLOCK_COLOR));
    verticle.push(new block(x - 1, y, zShape.BLOCK_COLOR));
    return verticle;
  }
}

export default zShape;