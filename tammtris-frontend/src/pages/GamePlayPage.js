import React from 'react';
import PlayGroundContainer from 'containers/PlayGroundContainer';
import GameControlContainer from 'containers/GameControlContainer';
import OtherPlayGroundsContainer from 'containers/OtherPlayGroundsContainer';
import GameResultContainer from 'containers/GameResultContainer';
import styles from './pages.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const GamePlayPage = () => {
  return (
    <div className={cx('gameplay-wrapper')}>
      <div className={cx('gameplay-page')}>
        <div className={cx('gameplay-header')}>
          <GameControlContainer/>
        </div>
        <div className={cx('otherplayground')}>
          <OtherPlayGroundsContainer/>
        </div>
        <GameResultContainer/>
      </div>
    </div>
  )
}

export default GamePlayPage;