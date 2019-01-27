import block from './block';

class emptyShape {
  static DEFAULT_X = 5;
  static DEFAULT_Y = 2;
  static BLOCK_COLOR = block.EMPTY;
  static ROTATION_STATUS = ['empty'];

  constructor(x, y) {
    this.baseBlock = new block(x || emptyShape.DEFAULT_X, y || emptyShape.DEFAULT_Y, emptyShape.BLOCK_COLOR);
    this.rotationACC = 0;
  }

  getShape() {
    return this.getDefaultShape();
  }

  getDefaultShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, emptyShape.BLOCK_COLOR));
    return verticle;
  }
}

export default emptyShape;