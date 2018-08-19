import React, { Component } from 'react'
import styles from './WaitingRoom.scss';
import classnames from 'classnames/bind';
import GameRoom from '../GameRoom';

const cx = classnames.bind(styles);

export default class WaitingRoom extends Component {

	renderRoomList(roomList, onGameJoin) {
		return Object.keys(roomList).map(key => {
			const { title, players, number } = roomList[key];
			return (
				<div className={cx('waiting-area-room')}>
					<GameRoom title={title} players={players} number={number} onGameJoin={onGameJoin}/>
				</div>
			)
		})
	}

  render() {
		const { renderRoom, renderRoomList } = this;
		const { waitingRoomData, onGameJoin } = this.props;
    return (
			<div className={cx('waiting-room-area')}>
				{renderRoomList(waitingRoomData.roomList, onGameJoin)}
			</div>
    );
  }
}
