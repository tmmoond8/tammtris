import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({children, responsive}) => {
  return (
    <div className={cx('page')}>
      <main classname={cx('content', { responsive })}>
      {children}
      </main>
    </div>
  );
};

export default PageTemplate;