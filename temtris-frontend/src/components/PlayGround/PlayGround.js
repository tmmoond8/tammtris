import React , {Component, Fragment} from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';
import GameDataManager from '../../utils/gameDataManager';
const gameDataManager = new GameDataManager();

const cx = classNames.bind(styles);

class PlayGround extends Component{
  constructor() {
    super();
    this.state = {
      gameData: gameDataManager.getGameData(),
      playerBlocks: [
        {dot: DotBlock.BLACK, xIdx: 3, yIdx: 4},
        {dot: DotBlock.BLACK, xIdx: 3, yIdx: 3},
      ],
      init: false
    }
    gameDataManager.bind(this);
  }

  handleKeyPress = (e) => {
    gameDataManager.handleKeyPress(e.key, this.state.playerBlocks);
  }

  render() {
    if(!this.state.init) {
      const { gameData, playerBlocks } = this.state;
      gameData[15][8] = DotBlock.BLACK;
      playerBlocks.forEach(item => gameData[item.yIdx][item.xIdx] = item.dot);
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

}

export default PlayGround;