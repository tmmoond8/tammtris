import React, { Component } from 'react';
import styles from './GameRoom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GameRoom extends Component {
  render() {
		const { title, players, gameNumber, onGameJoin } = this.props;
			return (
				<div onClick={() => onGameJoin(gameNumber)}>
					<div className={cx('game-room-number')}>{gameNumber}</div>
					<div className={cx('game-room-title')}>{title}</div>
					<ul className={cx('game-room-player-list')}>
						{players.map((player, index) => {
							return (
								<li className={cx('game-room-player-item')} key={index}>{player && player.name}</li>
							)
						})}
					</ul>
				</div>
			)
  }
};

export default GameRoom;