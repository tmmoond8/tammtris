class block {
  static EMPTY = 0;
  static RED = 1;
  static GRAPE = 2;
  static GREEN = 3;
  static YELLOW = 4;
  static ORANGE = 5;
  static BLUE = 6;
  static CYAN = 7;

  static getBlockColor = (color) => {
    switch(color) {
      case block.EMPTY: return 'transparent'
      case block.RED: return 'red'
      case block.GRAPE: return 'grape'
      case block.GREEN: return 'green'
      case block.YELLOW: return 'yellow'
      case block.ORANGE: return 'orange'
      case block.BLUE: return 'blue'
      case block.CYAN: return 'cyan'
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