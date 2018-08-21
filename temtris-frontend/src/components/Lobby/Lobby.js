import React, { Component } from 'react'
import styles from './Lobby.scss';
import classnames from 'classnames/bind';
import GameRoom from '../GameRoom';

const cx = classnames.bind(styles);

export default class Lobby extends Component {

	renderRoomList(gameList, onGameJoin) {
		return Object.keys(gameList).map(key => {
			const { title, players, gameNumber } = gameList[key];
			return (
				<div className={cx('lobby-room')} key={key}>
					<GameRoom title={title} players={players} gameNumber={gameNumber} onGameJoin={onGameJoin}/>
				</div>
			)
		})
	}

  render() {
		const { renderRoomList } = this;
		const { lobbyData, onGameJoin } = this.props;
    return (
			<div className={cx('lobby-area')}>
				{renderRoomList(lobbyData.gameList, onGameJoin)}
			</div>
    );
  }
}
