import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './GamePlay.scss';

import OtherPlayGrounds from '../OtherPlayGrounds';
import PlayGround from '../PlayGround';

const cx = classNames.bind(styles);

class GamePlay extends Component {
  render() {
    const { gameGroundData, playerBlocks, userInfo, onPlayerKeyDown, gameState, allGroundData } = this.props;

    return (
      <div className={cx('game-play')}>
        <OtherPlayGrounds allGroundData={allGroundData}/>
        <div className={cx('game-play-myplace')}>
          <PlayGround
            gameGroundData = {gameGroundData}
            playerBlocks = {playerBlocks}
            userInfo = {userInfo}
            onPlayerKeyDown = {onPlayerKeyDown}
            gameState = {gameState}
          />
        </div>
      </div>
    )
  }
}

export default GamePlay;