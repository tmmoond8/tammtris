import React, { Component } from 'react';
import Blank from '../Blank';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {
    return (
      <div className={cx('game-control')}>
        <div className={cx('game-control-logo')}>temtris</div>
        <div className={cx('game-control-chatting')}/>
        <div className={cx('game-control-team-selector')}>
          <Blank name='A'/>
          <Blank name='B'/>
          <Blank name='C'/>
          <Blank name='D'/>
        </div>
        <div className={cx('game-control-start')}/>
        <div className={cx('game-control-training')}/>
      </div>
    )
  }
}

export default GameControl;