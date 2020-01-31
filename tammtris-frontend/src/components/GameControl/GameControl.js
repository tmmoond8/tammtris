import React, { Component, Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './GameControl.scss';
import { Link } from 'react-router-dom';
import StartButton from '../StartButton';
import SinglePlayButton from '../SinglePlayButton';
import Chat from '../Chat';
import TeamSelectButtonsContainer from '../../containers/TeamSelectButtonsContainer';
import { GoThreeBars } from 'react-icons/go';

const cx = classNames.bind(styles);

class GameControl extends Component {
  render() {

    const { userInfo, chattingMessages, onClickSingle, onClickMulti, gameState, onToggleControl, isVisibleControl } = this.props;

    return (
      <div className={cx('game-control')}>
        <div to="/" className={cx('game-control-logo')}>
          <Link to="/">tammtris</Link>
            <span className={cx('game-control-hambug')} onClick={onToggleControl}>
              <GoThreeBars/>
          </span>
        </div>
        {
          isVisibleControl && (
            <Fragment>
              <div className={cx('chatting-wrapper')}>
                <div className={cx('chatting-close')} onClick={onToggleControl}>
                  <span style={{cursor: 'pointer', padding: '1.6rem'}}>&times;</span>
                </div>
                <Chat userInfo={userInfo} chattingMessages={chattingMessages}/>
                <TeamSelectButtonsContainer/>
                <StartButton onClickMulti={onClickMulti} gameState={gameState}/>
                <SinglePlayButton onClickSingle={onClickSingle} gameState={gameState}/>
              </div>
              <div className={cx('chatting-dimmed')} onClick={onToggleControl}/>
            </Fragment>
          )
        }
      </div>
    )
  }
}

export default GameControl;