import React, { Component, Fragment } from 'react';
import styles from './OtherPlayGrounds.scss';
import classNames from 'classnames/bind';
import PlayGround from 'components/PlayGround';
import NextShapes from 'components/NextShapes';

const cx = classNames.bind(styles);

class OtherPlayGrounds extends Component {

  renderPlayGround = (allGroundData) => {
    return allGroundData.map((gameGroundData, idx) => (
      <div className={cx('other-play-grounds-item')} key={idx}>
        <PlayGround 
          key={idx} 
          userIndex={idx + 1}
          gameGroundData={gameGroundData && gameGroundData.gameData} 
          userInfo={gameGroundData && gameGroundData} 
          gameState={gameGroundData && gameGroundData.gameState} 
          view='view'/>
      </div>
      )
    )
  }

  render() {
    const { allGroundData } = this.props;
    return (
      <div className={cx('other-play-grounds')}> 
        { this.renderPlayGround(allGroundData) }
        <div className={cx('next-shapes')}>
          <NextShapes/>
        </div>
      </div>
    );
  }
};

export default OtherPlayGrounds;