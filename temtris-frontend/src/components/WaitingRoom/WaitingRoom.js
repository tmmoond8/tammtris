import React, { Component } from 'react'
import styles from './WaitingRoom.scss';
import classnames from 'classnames/bind';
import GameRoom from '../GameRoom';

const cx = classnames.bind(styles);

export default class WaitingRoom extends Component {

	renderRoomList(roomList, onGameJoin) {
		return Object.keys(roomList).map(key => {
			const { title, gameManager, number } = roomList[key];
			return (
				<div className={cx('waiting-area-room')}>
					<GameRoom title={title} gameData={gameManager.gameData} number={number} onGameJoin={onGameJoin}/>
				</div>
			)
		})
	}

  render() {
		const { renderRoomList } = this;
		const { waitingRoomData, onGameJoin } = this.props;
    return (
			<div className={cx('waiting-room-area')}>
				{renderRoomList(waitingRoomData.roomList, onGameJoin)}
			</div>
    );
  }
}
