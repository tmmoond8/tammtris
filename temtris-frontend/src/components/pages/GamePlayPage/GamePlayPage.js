import React, { Component } from 'react';
import PlayGroundContainer from '../../../containers/PlayGroundContainer';
import styles from './GamePlayGround.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GamePlayPage extends Component {
  
  render() {
    return (
      <div className={cx('game-play-page')}>
        <PlayGroundContainer/>
      </div>
    )
  }
}

export default GamePlayPage;