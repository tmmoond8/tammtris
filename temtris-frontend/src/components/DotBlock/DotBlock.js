import React, { Component } from 'react';
import styles from './DotBlock.scss';
import classNames from 'classnames/bind';
import block from '../../models/block';

const cx = classNames.bind(styles);

class DotBlock extends Component {
  render() {
    const small = this.props.small ? 'small' : '';
    return <span className={cx('dot-block',
      block.getBlockColor(this.props.dot), small
    )}/>
  }
}

export default DotBlock;