import React , {Component} from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import block from '../../models/block';
import DotBlock from '../DotBlock';
import GameDataManager from '../../utils/gameDataManager';
import ShapeDataManager from '../../utils/shapeDataManager';
const gameDataManager = new GameDataManager();

const cx = classNames.bind(styles);

class PlayGround extends Component{
  constructor() {
    super();
    let shape = ShapeDataManager.getRandomShape();
    this.state = {
      gameData: gameDataManager.getGameData(),
      playerBlocks: shape,
      init: false
    }
    gameDataManager.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PlayGround.toString(nextState.gameData) !== PlayGround.toString(this.state.gameData);
  }

  handleKeyPress = (e) => {
    gameDataManager.handleKeyPress(e.key, this.state.playerBlocks);
  }

  render() {
    if(!this.state.init) {
      let { gameData, playerBlocks } = this.state;
      gameData[15][8] = block.BLACK;
      playerBlocks.getShape().forEach(item => gameData[item.y][item.x] = item.dot);
      gameDataManager.setGameData(gameData)
      this.setState({
        init: true
      })
    }

    return (
      <div tabIndex="0" className={cx('play-ground')} onKeyDown={this.handleKeyPress}>
        {PlayGround.renderAllLine(this.state.gameData)}
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