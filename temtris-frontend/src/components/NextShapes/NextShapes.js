import React from 'react';
import styles from './NextShapes.scss';
import classNames from 'classnames/bind';
import Shapes from 'components/Shapes';

const cx = classNames.bind(styles);

const NextShapes = () => {
  const data = [[-1,-1,-1,-1],[5,5,5,5],[-1,-1,-1,-1]];
  return (
    <div className={cx('next-shapes')}>
      <p className={cx('next-shapes-next')}>NEXT</p>
      <div className={cx('next-shapes-first')}>
      </div>
      <div className={cx('next-shapes-second')}>
      </div>
      <Shapes shape={data}/>
      <Shapes shape={data}/>
    </div>
  );
};

export default NextShapes;