import React, { Component } from 'react';
import GamePlayContainer from '../../../containers/GamePlayContainer';
import GameControlContainer from '../../../containers/GameControlContainer';
import styles from './GamePlayGround.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GamePlayPage extends Component {
  
  render() {
    return (
      <div className={cx('game-play-page')}>
        <GamePlayContainer/>
        <GameControlContainer/>
      </div>
    )
  }
}


export default GamePlayPage;