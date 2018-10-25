import React , {Component, Fragment } from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from 'components/DotBlock';
import UserPanel from 'components/UserPanel';
import ItemBox from 'components/ItemBox';
import GameDataManger, { GAME_STATE } from 'utils/gameDataManager';

const cx = classNames.bind(styles);

class PlayGround extends Component{

  shouldComponentUpdate(nextProps) {
    const prevUserInfo = this.props.userInfo;
    if(!nextProps.gameGroundData || !nextProps.userInfo || !this.props.gameGroundData) {
      return true;
    }
    return prevUserInfo.id !== nextProps.userInfo.id 
      || prevUserInfo.team !== nextProps.userInfo.team 
      || this.props.userIndex !== nextProps.userIndex
      || PlayGround.toString(this.props.gameGroundData) !== PlayGround.toString(nextProps.gameGroundData);
  }

  renderAllLine(gameData) {
    return (
      <div>
        {gameData.map((line, index) => (
          <div className={cx('block-line', this.props.view)} key={index}>{this.renderLine(line)}</div>
        ))}
      </div>
    )
  }

  renderGameOver(gameState, view) {
    if(gameState === GAME_STATE.GAME_OVER) {
      return <div className={cx('play-ground-game-over', view)}>GAME OVER</div>
    }
    return null;
  }

  renderLine (line) {
    return line.map(((dot, index) => <DotBlock dot={dot} key={index} small={this.props.view}/>));
  }

  render() {
    const { handleKeyPress } = this;
    const { gameGroundData, userInfo, view, gameState, userIndex, gameItems } = this.props;
    const team = userInfo && userInfo.team;
    return (
      <Fragment>
        <ItemBox gameItems={gameItems} view={view}/>
        <div className={cx('play-ground', view, team)} onKeyDown={handleKeyPress}>  
          <UserPanel userInfo={userInfo} view={view} userIndex={userIndex}/>
          <div style={{position: 'relative', background: 'white'}}>
            {this.renderAllLine(gameGroundData || GameDataManger.defaultGameData())}
            {this.renderGameOver(gameState, view)}
          </div>
        </div>
      </Fragment>
     
    )
  }

  static toString(gameData) {
    return gameData.reduce((acculator, line) => {
      acculator += line.join('');
      return acculator;
    }, '');
  }
}

export default PlayGround;