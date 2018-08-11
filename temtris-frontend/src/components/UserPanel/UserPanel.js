import React, { Component } from 'react'
import style from './UserPanel.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class UserPanel extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div className={cx('user-info-panel')}>
        <div className={cx('user-info-emoji')}>{userInfo.emoji}</div>
        <div className={cx('user-info-name')}>{userInfo.name}</div>
        <div className={cx('user-info-number')}>{3}</div>
      </div>
    )
  }
}

