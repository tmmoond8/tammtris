class block {
  static EMPTY = 0;
  static BLACK = 1;

  static getBlockColor = (color) => {
    switch(color) {
      case block.EMPTY: return 'transparent'
      case block.BLACK: return 'black'
      default: return 'transparent';
    }
  }

  constructor(x, y, dot) {
    this.x = x;
    this.y = y;
    this.dot = dot || block.EMPTY;
  }

}

export default block;