import React, { Component, Fragment } from 'react';
import styles from './OtherPlayGrounds.scss';
import classNames from 'classnames/bind';
import PlayGround from '../PlayGround';
import Blank from '../Blank';

const cx = classNames.bind(styles);

class OtherPlayGrounds extends Component {

  renderPlayGround = () => {
    return this.props.allGroundData.map((gameGroundData, idx) => 
      <div className={cx('other-play-grounds-item')} key={idx}>
        <PlayGround 
          key={idx} 
          gameNumber={gameGroundData.gameNumber}
          gameGroundData={gameGroundData && gameGroundData.gameData} 
          userInfo={gameGroundData && gameGroundData} 
          gameState={gameGroundData && gameGroundData.gameState} 
          view='view'/>
      </div>
    )
  }

  render() {
    return (
      <div className={cx('other-play-grounds')}> 
        { this.renderPlayGround() }
        <Blank name="Next shapes"/>
        </div>
    );
  }
};

export default OtherPlayGrounds;