import React from 'react';
import PlayGroundContainer from '../../../containers/PlayGroundContainer';
import OtherPlayGroundContainer from '../../../containers/OtherPlayerGroundsContainer';
import styles from './GamePlayGround.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const GamePlayPage = () => {
  const style = {
    flex: 1
  }
  return (
    <div className={cx('game-play-page')}>
      <PlayGroundContainer/>
      <OtherPlayGroundContainer style={style}/>
    </div>
  )
}

export default GamePlayPage;