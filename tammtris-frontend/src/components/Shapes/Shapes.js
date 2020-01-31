import React, { Component } from 'react';
import styles from './Shapes.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';

const cx = classNames.bind(styles);

class Shapes extends Component {

  renderLine (line) {
    return line.map(((dot, index) => <DotBlock dot={dot} key={index}/>));
  }

  render() {
    const { shape } = this.props;
    return (
      <div>
        {shape.map((line, index) => (
          <div className={cx('block-line')} key={index}>{this.renderLine(line)}</div>
        ))}
      </div>
    );
  }
};

export default Shapes;