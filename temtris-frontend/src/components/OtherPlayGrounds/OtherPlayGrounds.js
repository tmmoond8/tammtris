import React from 'react';
import styles from './OtherPlayGrounds.scss';
import classNames from 'classnames/bind';
import PlayGround from '../PlayGround';

const cx = classNames.bind(styles);

class OtherPlayGrounds extends React.Component {

  renderPlayGround = () => {
    this.props.gameGroundData.forEach(item => console.log(item))
    return this.props.gameGroundData.map((gameGroundData, idx) => <PlayGround key={idx} gameGroundData={gameGroundData} view='view'/>)
  }

  render() {
    return (
      <div className={cx('other-play-grounds')}> 
        { this.renderPlayGround() }
      </div>
    );
  }
};

export default OtherPlayGrounds;