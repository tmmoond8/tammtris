import React, { Component } from 'react'
import styles from './Lobby.scss';
import classnames from 'classnames/bind';
import GameRoom from '../GameRoom';

const cx = classnames.bind(styles);

export default class Lobby extends Component {

	renderRoomList(roomList, onGameJoin) {
		return Object.keys(roomList).map(key => {
			const { title, players, number } = roomList[key];
			return (
				<div className={cx('lobby-room')} key={key}>
					<GameRoom title={title} players={players} number={number} onGameJoin={onGameJoin}/>
				</div>
			)
		})
	}

  render() {
		const { renderRoomList } = this;
		const { lobbyData, onGameJoin } = this.props;
    return (
			<div className={cx('lobby-area')}>
				{renderRoomList(lobbyData.roomList, onGameJoin)}
			</div>
    );
  }
}
