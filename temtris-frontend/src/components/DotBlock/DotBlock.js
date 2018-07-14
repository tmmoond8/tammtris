import React from 'react';
import styles from './DotBlock.scss';
import classNames from 'classnames/bind';
import block from '../../viewModules/block';

const cx = classNames.bind(styles);

const DotBlock = ({dot}) => {
  console.log(dot);
  return <span className={cx('dot-block', block.getBlockColor(dot))}/>
}

export default DotBlock;