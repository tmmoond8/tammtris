import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './LobbyControl.scss';
import Chat from '../Chat';

const cx = classNames.bind(styles);

class LobbyControl extends Component {

  renderUserList(waitingUserList, userInfo) {
    waitingUserList = waitingUserList.filter(user => user.id !== userInfo.id);
      return (
        <ul className={cx('lobby-userlist')}>
          <li className={cx('lobby-userlist-item', 'me')}>{userInfo.emoji} {userInfo.name}</li>
          {waitingUserList.map(user => <li className={cx('lobby-userlist-item')}>{user.emoji} {user.name}</li>)}
        </ul>
      );
  }

  render() {
    const { userInfo, chattingMessages, waitingUserList} = this.props;
    const { renderUserList } = this;

    return (
      <div className={cx('lobby')}>
        <div className={cx('lobby-logo')}>temtris</div>
        <Chat userInfo={userInfo} chattingMessages={chattingMessages}/>
        {renderUserList(waitingUserList, userInfo)}
      </div>
    )
  }
}

export default LobbyControl;