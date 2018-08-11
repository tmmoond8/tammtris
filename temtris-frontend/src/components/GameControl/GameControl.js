import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';
import StartButton from '../StartButton';
import SinglePlayButton from '../SinglePlayButton';
import TeamSelectRadioButton from '../TeamSelectRadioButton';
import Chat from '../Chat';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {

    const { userInfo, chattingMessages, onReceiveMessage, onClickSingle, onClickMulti, gameState } = this.props;

    return (
      <div className={cx('game-control')}>
        <div className={cx('game-control-logo')}>temtris</div>
        <Chat userInfo={userInfo} chattingMessages={chattingMessages} onReceiveMessage={onReceiveMessage}/>
        <TeamSelectRadioButton/>
        <StartButton onClickMulti={onClickMulti} gameState={gameState}/>
        <SinglePlayButton onClickSingle={onClickSingle} gameState={gameState}/>
      </div>
    )
  }
}

export default GameControl;