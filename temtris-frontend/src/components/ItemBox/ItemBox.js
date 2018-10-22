import React, { Component } from 'react';
import styles from './ItemBox.scss';
import classNames from 'classnames/bind';
import DotBlock from 'components/DotBlock';

const cx = classNames.bind(styles);
const defaultItemBox = 'a'.repeat(10).split('').map(item => 0);

class ItemBox extends Component {

  renderLine (gameItems, view) {
    const validGameItems = (gameItems) => Array.isArray(gameItems) ? gameItems : defaultItemBox
    return validGameItems(gameItems).map(((dot, index) => <DotBlock dot={dot} key={index} small={view}/>));
  }

  render() {
    const { renderLine } = this;
    const { view, gameItems } = this.props;

    return (
      <div className={cx('item-box')}>
        {renderLine(gameItems, view)}
      </div>
    );
  }
};

export default ItemBox;