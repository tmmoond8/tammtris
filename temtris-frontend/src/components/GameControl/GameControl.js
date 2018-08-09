import React, { Component } from 'react';
import Blank from '../Blank';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';
import StartButton from '../StartButton';
import SinglePlayButton from '../SinglePlayButton';
import TeamSelectRadioButton from '../TeamSelectRadioButton';
import Chat from '../Chat';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {

    const { userInfo, chattingMessages, broadcastActions, onGameStart } = this.props;

    return (
      <div className={cx('game-control')}>
        <div className={cx('game-control-logo')}>temtris</div>
        <Chat userInfo={userInfo} chattingMessages={chattingMessages} broadcastActions={broadcastActions}/>
        <TeamSelectRadioButton/>
        <StartButton/>
        <SinglePlayButton onGameStart={onGameStart}/>
      </div>
    )
  }
}

export default GameControl;