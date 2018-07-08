import React , {Component, Fragment} from 'react';
import styles from './PlayGround.scss';
import classNames from 'classnames/bind';
import DotBlock from '../DotBlock';

const cx = classNames.bind(styles);

class PlayGround extends Component{
  state = {
    gameData: '1234567890123456789'.split('').map( item => PlayGround.defaultLine())
  }

  render() {
    const renderLine = (line) => {
      return line.map(((dot, index) => <DotBlock dot={dot} key={index}/>));
    }
    const renderAllLine = (gameData) => {
      return (
        <Fragment className={cx('play-ground')}>
          {this.state.gameData.map((line, index) => (
            <div className={cx('block-line')} key={index}>{renderLine(line)}</div>
          ))}
        </Fragment>
        
      )
      // this.state.gameData.map((line) => {
        
      // }
    }

    return (
      <div className={cx('play-ground')}>
        {renderAllLine(this.state.gameData, renderLine)}
      </div>
    )
  }

  static defaultLine() {
    return '12345678901'.split('').map( item => DotBlock.EMPTY);
  }
}

export default PlayGround;