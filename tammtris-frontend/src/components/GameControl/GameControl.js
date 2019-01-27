import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';
import { Link } from 'react-router-dom';
import StartButton from 'components/StartButton';
import SinglePlayButton from 'components/SinglePlayButton';
import TeamSelectButtonsContainer from 'containers/TeamSelectButtonsContainer';
import Chat from 'components/Chat';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {

    const { userInfo, chattingMessages, onClickSingle, onClickMulti, gameState } = this.props;

    return (
      <div className={cx('game-control')}>
        <Link to="/" className={cx('game-control-logo')}>tammtris</Link>
        <Chat userInfo={userInfo} chattingMessages={chattingMessages}/>
        <TeamSelectButtonsContainer/>
        <StartButton onClickMulti={onClickMulti} gameState={gameState}/>
        <SinglePlayButton onClickSingle={onClickSingle} gameState={gameState}/>
      </div>
    )
  }
}

export default GameControl;