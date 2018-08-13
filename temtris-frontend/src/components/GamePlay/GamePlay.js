import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './GamePlay.scss';

import OtherPlayGrounds from '../OtherPlayGrounds';
import PlayGround from '../PlayGround';

const cx = classNames.bind(styles);

class GamePlay extends Component {

  render() {
    const { gameGroundData, playerBlocks, userInfo, onPlayerKeyDown, gameState, allGroundData } = this.props;
    let index = allGroundData.findIndex(item => !!item && item.userInfo && userInfo.id === item.userInfo.id);
    return (
      <div className={cx('game-play')}>
        <OtherPlayGrounds allGroundData={allGroundData}/>
        <div className={cx('game-play-myplace')}>
          <PlayGround
            gameGroundData = {gameGroundData}
            number={index + 1}
            playerBlocks = {playerBlocks}
            userInfo = {allGroundData[index] ? allGroundData[index].userInfo : userInfo}
            onPlayerKeyDown = {onPlayerKeyDown}
            gameState = {gameState}
          />
        </div>
      </div>
    )
  }
}

export default GamePlay;