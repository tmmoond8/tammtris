import React , {Component} from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';

const cx = classNames.bind(styles);

class PlayGround extends Component{
  handleKeyPress = (e) => {
    this.props.onPlayerKeyDown(e.nativeEvent.code);
  }

  renderAllLine(gameData) {
    return (
      <div className={cx('play-ground')}>
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
    const { gameGroundData } = this.props;
    const styles = this.props.view ? {} : { tabIndex: "0"};
    return (
      <div tabIndex className={cx('play-ground')} onKeyDown={this.handleKeyPress} {...styles}>
        {this.renderAllLine(gameGroundData)}
      </div>
    )
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