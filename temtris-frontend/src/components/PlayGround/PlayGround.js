import React , {Component} from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';
import UserPanel from '../UserPanel';
import GameDataManger from '../../utils/gameDataManager';

const cx = classNames.bind(styles);

class PlayGround extends Component{
  handleKeyPress = (e) => {
    this.props.onPlayerKeyDown(e.nativeEvent.code);
  }

  shouldComponentUpdate(nextProps) {
    if(!nextProps.gameGroundData || !nextProps.userInfo || !this.props.gameGroundData || this.props.userInfo) {
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

  renderLine (line) {
    return line.map(((dot, index) => <DotBlock dot={dot} key={index} small={this.props.view}/>));
  }

  render() {
    const { gameGroundData, userInfo, view } = this.props;
    const styles = view ? {} : { tabIndex: "0"};
    return (
      <div className={cx('play-ground', this.props.view)} onKeyDown={this.handleKeyPress} {...styles}>  
        <UserPanel userInfo={userInfo} view={view}/>
        {this.renderAllLine(gameGroundData || GameDataManger.defaultGameData())}
      </div>
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