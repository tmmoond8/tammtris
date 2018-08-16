import React, { Component, Fragment } from 'react';
import styles from './GameRoom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GameRoom extends Component {
  render() {
		const { title, players, number } = this.props;
		players.push({name: 'aaaaaa'})
		players.push({name: 'vvvv'})
		players.push({name: 'bbbb'})
		players.push({name: 'ccc'})
		players.push({name: 'ccc'})
		players.push({name: 'ccccc'})
			return (
				<Fragment>
				<div className={cx('game-room-number')}>{number}</div>
				<div className={cx('game-room-title')}>{title}</div>
					<ul className={cx('game-room-player-list')}>
						{players.map((player) => {
							return (
								<li className={cx('game-room-player-item')}>{player.name}</li>
							)
						})}
					</ul>
				</Fragment>
			)
  }
};

export default GameRoom;