import React, { Component } from 'react';
import styles from './GameRoom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class GameRoom extends Component {
  render() {
		const serverUrl = `http://${window.location.hostname}:14666/images/`;
		const { title, players, gameNumber, onGameJoin } = this.props;
		const style = {
			backgroundImage: `url("${serverUrl}${title}.jpg")`
		}
			return (
				<div className={cx('game-room', title)} onClick={() => onGameJoin(gameNumber)} style={style}>
					<div className={cx('game-room-player-list')}>
						{ players.filter(player => !!player).map(player => player.name).join(', ')}
					</div>
				</div>
			)
  }
};

export default GameRoom;