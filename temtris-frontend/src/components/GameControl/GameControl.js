import React, { Component } from 'react';
import Blank from '../Blank';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {
    return (
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
    )
  }
}

export default GameControl;