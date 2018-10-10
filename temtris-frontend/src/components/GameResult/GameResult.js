import React from 'react';
import styles from './GameResult.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

const GameResult = ({team, result}) => {
  team = 'individual';
  result = 'vitory';
  return (
    <div className={cx('game-result-area')}>
      <div className={cx('game-result-box', team)}>
        {result.toUpperCase()}!
      </div>
    </div>
  )
}

export default GameResult;