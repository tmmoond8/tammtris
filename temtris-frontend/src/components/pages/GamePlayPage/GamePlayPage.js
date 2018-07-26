import React, { Component } from 'react';
import PlayGroundContainer from '../../../containers/PlayGroundContainer';
import OtherPlayGroundContainer from '../../../containers/OtherPlayerGroundsContainer';
import styles from './GamePlayGround.scss';
import classNames from 'classnames/bind';
import gameAPI from '../../../api/gamePlay';

const cx = classNames.bind(styles);

class GamePlayPage extends Component {
  state = {
    userInfo: null,
  }

  componentDidMount() {
    // join으로 id 정보를 받은 후 socket을 연결
    gameAPI.join().then((response) => {
        this.state.userInfo = response.data;
        console.log(this.state.userInfo);
        // this.playGroundActions.userInfo(userInfo);
    }).catch(err => {
        console.error(err);
    })
  }
  
  render() {
    const style = {
      flex: 1
    }
    return (
      <div className={cx('game-play-page')}>
        <PlayGroundContainer userInfo={this.state.userInfo}/>
        <OtherPlayGroundContainer style={style}/>
      </div>
    )
  }
}

export default GamePlayPage;