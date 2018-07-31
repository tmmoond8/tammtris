import React from 'react';
import styles from './OtherPlayGrounds.scss';
import classNames from 'classnames/bind';
import PlayGround from '../PlayGround';

const cx = classNames.bind(styles);

class OtherPlayGrounds extends React.Component {

  renderPlayGround = () => {
    return this.props.allGroundData.map((gameGroundData, idx) => 
      <PlayGround key={idx} gameGroundData={gameGroundData && gameGroundData.gameData} userInfo={gameGroundData && gameGroundData.userInfo} view='view'/>
    )
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