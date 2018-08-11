import React, { Component } from 'react'
import style from './UserPanel.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class UserPanel extends Component {
  render() {
    const { userInfo, view } = this.props;
    return (
      <div className={cx('user-info-panel', view)}>
      <div className={cx('user-info-number', view)}>{3}</div>
        { userInfo && <div className={cx('user-info-name', view)}>{userInfo.name}</div>}
        { userInfo && <div className={cx('user-info-emoji', view)}>{userInfo.emoji}</div>}
      </div>
    )
  }
}

