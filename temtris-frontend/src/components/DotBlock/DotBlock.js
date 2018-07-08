import React from 'react';
import styles from './DotBlock.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DotBlock = ({dot}) => {
  return <span className={cx('dot-block')}/>
}

DotBlock.EMPTY = 0;
DotBlock.BLACK = 1;

DotBlock.colorPalette = {};
DotBlock.colorPalette[DotBlock.EMPTY] = 'transparent';
DotBlock.colorPalette[DotBlock.BLACK] = 'black';

export default DotBlock;