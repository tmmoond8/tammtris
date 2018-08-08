import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './GamePlay.scss';

import OtherPlayGrounds from '../OtherPlayGrounds';
import PlayGround from '../PlayGround';
import Chat from '../Chat';

const cx = classNames.bind(styles);

class GamePlay extends Component {
  render() {
    const { gameGroundData, playerBlocks, userInfo, onPlayerKeyDown, onGameStart, gameState, allGroundData, chattingMessages, broadcastActions } = this.props;

    return (
      <div className={cx('game-play')}>
        <OtherPlayGrounds allGroundData={allGroundData}/>
        <div className={cx('game-play-myplace')}>
          <PlayGround
            gameGroundData = {gameGroundData}
            playerBlocks = {playerBlocks}
            userInfo = {userInfo}
            onPlayerKeyDown = {onPlayerKeyDown}
            onGameStart = {onGameStart}
            gameState = {gameState}
          />
        </div>
      </div>
    )
  }
}

export default GamePlay;