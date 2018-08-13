import React , {Component, Fragment } from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';
import UserPanel from '../UserPanel';
import GameDataManger, { GAME_STATE } from '../../utils/gameDataManager';

const cx = classNames.bind(styles);

class PlayGround extends Component{
  handleKeyPress = (e) => {
    this.props.onPlayerKeyDown(e.nativeEvent.code);
  }

  shouldComponentUpdate(nextProps) {
    const { gameGroundData, userInfo, view, gameState, number } = nextProps;
    // (view && gameState) && console.log(gameState);
    if(!nextProps.gameGroundData || !nextProps.userInfo || !this.props.gameGroundData) {
      return true;
    }
    return this.props.userInfo.id !== nextProps.userInfo.id ||
    PlayGround.toString(this.props.gameGroundData) !== PlayGround.toString(nextProps.gameGroundData);
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
    const { gameGroundData, userInfo, view, gameState, number } = this.props;
    // (view && gameState) && console.log(gameState);
    const styles = view ? {} : { tabIndex: "0"};
    return (
      <Fragment>
        <div className={cx('play-ground', view)} onKeyDown={this.handleKeyPress} {...styles}>  
          <UserPanel userInfo={userInfo} view={view} number={number}/>
          <div style={{position: 'relative'}}>
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