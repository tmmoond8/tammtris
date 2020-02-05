import React, { Component } from 'react';
import styles from './GamePad.scss';
import classNames from 'classnames/bind';
import { FaUndoAlt, FaAngleLeft, FaAngleRight, FaAngleDown, FaAngleDoubleDown } from 'react-icons/fa';

const cx = classNames.bind(styles);

class GamePad extends Component {
  static keepEvent = ['ArrowRight', 'ArrowLeft', 'ArrowDown'];

  state = {
    keyCode: null
  }


  componentDidMount() {
    const gameLoop = () => {
      if(this.statekeyCode) {
        if(GamePad.keepEvent.findIndex(item => item === this.state.keyCode) !== -1) {
          this.setState({
            log: this.state.log + ' touch'
          })
        }
      }
    }

    this.interval = setInterval(gameLoop, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  touchDownEvent = keyCode => {
    // this.setState({
    //   keyCode: keyCode
    // })
    // if(GamePad.keepEvent.findIndex(item => item === keyCode) !== -1) {
    //   this.setState({
    //     log: this.state.log + ' down'
    //   })
    // }
  }
  touchUpEvent = _=> {
    this.setState({
      keyCode: null
    })
  }
  
  render() {
    const { onTouch } = this.props;
    const start = (e, keyCode) => {
      e.stopPropagation();
      e.preventDefault();
      this.touchDownEvent(keyCode);
      // onTouch(keyCode)
    }
    const end = (e, keyCode) => {
      e.stopPropagation();
      e.preventDefault();
      this.touchUpEvent(keyCode);
      // this.setState({
      //   log: this.state.log + '\nend'
      // })

    }
    return (
      <div className={cx('gamepad')}>
        <div className={cx('gamepad-arrow')}>
          <div className={cx('gamepad-btn', 'gamepad-left')} 
            onTouchStart={(e) => onTouch(e, 'ArrowLeft')}
            // onTouchEnd={(e) => onTouch(e, 'ArrowLeft')}
            ><FaAngleLeft/></div>
          <div className={cx('gamepad-btn', 'gamepad-down')}
            onTouchStart={(e) => onTouch(e, 'ArrowDown')}
            // onTouchEnd={(e) => onTouch(e, 'ArrowDown')}
          ><FaAngleDown/></div>
          <div className={cx('gamepad-btn', 'gamepad-right')}
            onTouchStart={(e) => onTouch(e, 'ArrowRight')}
            // onTouchEnd={(e) => onTouch(e, 'ArrowRight')}
          ><FaAngleRight/></div>
        </div>
        <div className={cx('gamepad-arrow')}>
          <div className={cx('gamepad-btn', 'gamepad-space')}
            onTouchStart={(e) => onTouch(e, 'Space')}
            // onTouchEnd={(e) => onTouch(e, 'Space')}
          ><FaAngleDoubleDown/></div>
          <div className={cx('gamepad-btn', 'gamepad-rotation')}
            onTouchStart={(e) => onTouch(e, 'ArrowUp')}
            // onTouchEnd={(e) => onTouch(e, 'ArrowUp')}
          ><FaUndoAlt/></div>
        </div>
      </div>
    );
  }
};

export default GamePad;