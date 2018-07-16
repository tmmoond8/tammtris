import block from './block';

class squareShape {
  static DEFAULT_X = 4;
  static DEFAULT_Y = 0;
  static BLOCK_COLOR = block.BLACK;
  static ROTATION_STATUS = ['nomal'];

  constructor(x, y) {
    this.baseBlock = new block(x || squareShape.DEFAULT_X, y || squareShape.DEFAULT_Y, squareShape.BLOCK_COLOR);
  }

  getShape() {
    const { x, y } = this.baseBlock;
    const verticle = [];
    verticle.push(new block(x, y, squareShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y + 1, squareShape.BLOCK_COLOR));
    verticle.push(new block(x + 1, y, squareShape.BLOCK_COLOR));
    verticle.push(new block(x, y + 1, squareShape.BLOCK_COLOR));
    return verticle;
  }
}

export default squareShape;