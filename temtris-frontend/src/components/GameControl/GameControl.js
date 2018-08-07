import React, { Component } from 'react';
import Blank from '../Blank';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';
import StartButton from '../StartButton';
import SinglePlayButton from '../SinglePlayButton';
import TeamSelectRadioButton from '../TeamSelectRadioButton';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {
    return (
      <div className={cx('game-control')}>
        <div className={cx('game-control-logo')}>temtris</div>
        <div className={cx('game-control-chatting')}/>
        <TeamSelectRadioButton/>
        <StartButton/>
        <SinglePlayButton/>
      </div>
    )
  }
}

export default GameControl;