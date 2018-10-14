import React, { Component } from 'react';
import styles from './DotBlock.scss';
import classNames from 'classnames/bind';
import block from 'models/shapes/block';
import { FaAngleUp, FaAngleDoubleUp, FaAngleDown, FaAngleDoubleDown } from 'react-icons/fa';


const cx = classNames.bind(styles);

class DotBlock extends Component {
  constructor(props) {
    super(props);
    this.ITEM = {
      [block.ITEM_UP1]: <FaAngleUp/>,
      [block.ITEM_DOWN1]: <FaAngleDown/>,
      [block.ITEM_UP3]: <FaAngleDoubleUp/>,
      [block.ITEM_DOWN3]: <FaAngleDoubleDown/>
    }
  }

  getItemImage(dot) {
    return this.ITEM[dot];
  }

  render() {
    const small = this.props.small ? 'small' : '';
    const icon = this.ITEM[this.props.dot];
    return (<span className={cx('dot-block',
      block.getBlockColor(this.props.dot),
      small
    )}>
    {icon}
    </span>);
  }
}

export default DotBlock;