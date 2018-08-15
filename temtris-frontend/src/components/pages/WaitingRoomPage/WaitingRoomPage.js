import React, { Component } from 'react';
import GameControlContainer from '../../../containers/GameControlContainer';
import styles from './WaitingRoomPage.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class WaitingRoomPage extends Component {
  render() {
    return (
      <div className={cx('waiting-room-page')}>
        <GameControlContainer/>
      </div>
    )
  }
}

export default WaitingRoomPage;