import React, { Component } from 'react'
import styles from './WaitingRoom.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default class WaitingRoom extends Component {

	renderRoom() {
		return (
			<div className={cx('waiting-room')}>
				a
			</div>
		)
	}

  render() {
		const { renderRoom } = this;
    return (
			<div className={cx('waiting-room-area')}>
				{this.props.rooms.map(room => renderRoom())}
			</div>
    );
  }
}
