import React, { Component } from 'react';
import className from 'classnames/bind';
import styles from './SinglePlayButton.scss';
const cx = className.bind(styles);

class SinglePlayButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onGameStart } = this.props;
    return (
      <div onClick={onGameStart}  className={cx('single-play-button')}>
        single
      </div>
    );
  }
}

export default SinglePlayButton;