import React, { Component } from 'react';
import styles from './GameRoom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GameRoom extends Component {
  render() {
		const { title, players, number, onGameJoin } = this.props;
			return (
				<div onClick={() => onGameJoin(number)}>
					<div className={cx('game-room-number')}>{number}</div>
					<div className={cx('game-room-title')}>{title}</div>
					<ul className={cx('game-room-player-list')}>
						{players.map((player) => {
							return (
								<li className={cx('game-room-player-item')}>{player.name}</li>
							)
						})}
					</ul>
				</div>
			)
  }
};

export default GameRoom;