import React, { Component } from 'react';
import GamePlayContainer from '../../../containers/GamePlayContainer';
import styles from './GamePlayGround.scss';
import classNames from 'classnames/bind';
import Blank from '../../Blank';

const cx = classNames.bind(styles);

class GamePlayPage extends Component {
  
  render() {
    return (
      <div className={cx('game-play-page')}>
        <GamePlayContainer/>
        <Blank name='gameController'>
          <Blank name='Temtris'/>
          <Blank name='Chatting'/>
          <Blank name='team selector'>
            <Blank name='A'/>
            <Blank name='B'/>
            <Blank name='C'/>
            <Blank name='D'/>
          </Blank>
          <Blank name='START'/>
          <Blank name='Training'/>
        </Blank>
      </div>
    )
  }
}

export default GamePlayPage;