import React from 'react';
import styles from './NextBlocks.scss';
import classNames from 'classnames/bind';
import Shapes from '../Shapes';

const cx = classNames.bind(styles);

const NextBlocks = ({ nextShapes }) => {
  const firstBlocks = "123".split('').map(line => "123456".split('').map(() => -1));  
  const secondBlocks = "123".split('').map(line => "123456".split('').map(() => -1));  
  nextShapes && nextShapes[0].forEach(dot => {
    firstBlocks[dot.y][dot.x - 1] = dot.dot;
  });
  nextShapes && nextShapes[1].forEach(dot => {
    secondBlocks[dot.y][dot.x - 1] = dot.dot;
  });
  
  return (
    <div className={cx('next-blocks')}>
      <p className={cx('next-blocks-next')}>NEXT</p>
      <div className={cx('next-blocks-shape')}>
        <Shapes shape={firstBlocks}/>
      </div>
      <div className={cx('next-blocks-shape')}>
        <Shapes shape={secondBlocks}/>
      </div>
    </div>
  );
};

export default NextBlocks;