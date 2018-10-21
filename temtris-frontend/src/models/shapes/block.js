
class block {
  static EMPTY = 0;
  static RED = 1;
  static GRAPE = 2;
  static GREEN = 3;
  static YELLOW = 4;
  static ORANGE = 5;
  static BLUE = 6;
  static CYAN = 7;
  static GREY = 8;
  static ITEM_UP1 = 11;
  static ITEM_DOWN1 = 12;
  static ITEM_UP3 = 13;
  static ITEM_DOWN3 = 14;
  static ITEM_CLEAR = 15;
  static ITEM_BOMB = 16;
  static TRANSPARENT = -1;

  static getBlockColor = (dot) => {
    switch(dot) {
      case block.EMPTY: return 'empty'
      case block.RED: return 'red'
      case block.GRAPE: return 'grape'
      case block.GREEN: return 'green'
      case block.YELLOW: return 'yellow'
      case block.ORANGE: return 'orange'
      case block.BLUE: return 'blue'
      case block.CYAN: return 'cyan'
      case block.GREY: return 'grey'
      case block.ITEM_UP1: 
      case block.ITEM_UP3: 
      case block.ITEM_BOMB: 
        return 'pink'
        case block.ITEM_DOWN1: 
        case block.ITEM_DOWN3: 
        case block.ITEM_CLEAR: 
          return 'lime'
      case block.TRANSPARENT: return 'transparent'
      
      default: return 'empty';
    }
  }

  constructor(x, y, dot) {
    this.x = x;
    this.y = y;
    this.dot = dot || block.EMPTY;
  }

  equlas(object) {
    return object.constructor.name === 'block' && object.x === this.x && object.y === this.y && object.dot === this.dot;
  }

}

export default block;