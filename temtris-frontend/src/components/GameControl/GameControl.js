import React, { Component } from 'react';
import Blank from '../Blank';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';
import StartButton from '../StartButton';
import SinglePlayButton from '../SinglePlayButton';

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
       <StartButton/>
       <SinglePlayButton/>
      </div>
    )
  }
}

export default GameControl;