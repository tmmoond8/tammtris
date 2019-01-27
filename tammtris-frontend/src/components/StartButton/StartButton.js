import React, { Component } from 'react';
import className from 'classnames/bind';
import styles from './StartButton.scss';
const cx = className.bind(styles);

class StartButton extends Component {
  render() {
    const { onClickMulti } = this.props;
    return (
      <div onClick={onClickMulti} className={cx('start-button')}>
        start
      </div>
    );
  }
}

export default StartButton;