import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './WaitingControl.scss';
import Chat from '../Chat';

const cx = classNames.bind(styles);

class WaitingControl extends Component {

  renderUserList(userList, userInfo) {
    userList = userList.filter(user => user.id !== userInfo.id);
    return (
      <ul className={cx('waiting-control-userlist')}>
        <li className={cx('waiting-control-userlist-item', 'me')}>{userInfo.emoji} {userInfo.name}</li>
        {userList.map(user => <li className={cx('waiting-control-userlist-item')}>{user.emoji} {user.name}</li>)}
      </ul>
    )
  }

  render() {
    const { userInfo, chattingMessages, onReceiveMessage, userList} = this.props;
    const { renderUserList } = this;

    return (
      <div className={cx('waiting-control')}>
        <div className={cx('waiting-control-logo')}>temtris</div>
        <Chat userInfo={userInfo} chattingMessages={chattingMessages} onReceiveMessage={onReceiveMessage}/>
        {renderUserList(userList, userInfo)}
      </div>
    )
  }
}

export default WaitingControl;