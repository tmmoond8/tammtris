import React , {Component} from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';

const cx = classNames.bind(styles);

class PlayGround extends Component{
  handleKeyPress = (e) => {
    this.props.onPlayerKeyDown(e.nativeEvent.code);
  }

  render() {
    const { gameGroundData } = this.props;
    return (
      <div tabIndex="0" className={cx('play-ground')} onKeyDown={this.handleKeyPress}>
        {PlayGround.renderAllLine(gameGroundData)}
      </div>
    )
  }

  static renderAllLine(gameData) {
    return (
      <div className={cx('play-ground')}>
        {gameData.map((line, index) => (
          <div className={cx('block-line')} key={index}>{PlayGround.renderLine(line)}</div>
        ))}
      </div>
    )
  }

  static renderLine (line) {
    return line.map(((dot, index) => <DotBlock dot={dot} key={index}/>));
  }
  static toString(gameData) {
    gameData.reduce((acculator, line) => {
      acculator += line.join('');
      return acculator;
    }, '');
    return gameData;
  }
}

export default PlayGround;