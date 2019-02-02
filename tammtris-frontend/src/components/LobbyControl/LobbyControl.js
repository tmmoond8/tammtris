import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './LobbyControl.scss';
import Chat from 'components/Chat';
import { GoThreeBars } from 'react-icons/go';

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
    const { userInfo, chattingMessages, waitingUserList, onToggleControl, isVisibleControl} = this.props;
    const { renderUserList } = this;

    return (
      <div className={cx('lobby')}>
        <div className={cx('lobby-logo')}>
          <span>tammtris</span>
          <span className={cx('lobby-hambug')} onClick={onToggleControl}>
            <GoThreeBars/>
          </span>
        </div>
        {
          isVisibleControl && (
            <div className={cx('chtting-wrapper')}>
              <div className={cx('chtting-close')} onClick={onToggleControl}>
                <span style={{cursor: 'pointer', padding: '1.6rem'}}>&times;</span>
              </div>
              <Chat userInfo={userInfo} chattingMessages={chattingMessages}/>
              {renderUserList(waitingUserList, userInfo)}
              <div className={cx('chtting-close')} onClick={onToggleControl}>
                <span style={{cursor: 'pointer', padding: '1.6rem'}}>&times;</span>
              </div>
            </div>
          )
        }  
      </div>
    )
  }
}

export default LobbyControl;