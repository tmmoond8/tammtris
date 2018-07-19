import React, { Component } from 'react';
import styles from './DotBlock.scss';
import classNames from 'classnames/bind';
import block from '../../models/block';

const cx = classNames.bind(styles);

class DotBlock extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.dot !== this.props.dot
  }
  render() {
    console.log('dot');
    return <span className={cx('dot-block', block.getBlockColor(this.props.dot))}/>
  }
}

export default DotBlock;