import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GameControl from '../components/GameControl';
import Actions from '../store/modules';
import SocketClient from '../lib/SocketClient';

class GameControlContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();

    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);

    SocketClient.addEventOn('game_start', (response) => {
      const { playGroundActions } = this;
      playGroundActions.singleGameStart({
        autoDown: () => playGroundActions.playerKeyDown('ArrowDown')
      });
    });
  }

  handleGameStart = () => {
    const { playGroundActions } = this;
    playGroundActions.singleGameStart({
      autoDown: () => playGroundActions.playerKeyDown('ArrowDown')
    });
  }

  handleMultiGameStart = () => {
    const { userInfo } = this.props;
    SocketClient.sendMessage('game_start', { userInfo });
  }

  handleReceiveMessage = (msg) => {
    const { userInfo } = this.props;
    this.broadcastActions.chattingMessages({...msg, userInfo})
  }

  render() {
    const { handleGameStart, handleReceiveMessage, handleMultiGameStart } = this;
    const { userInfo, chattingMessages, gameState } = this.props;

    return (
      <GameControl 
        userInfo={userInfo} 
        chattingMessages={chattingMessages}
        onClickSingle={handleGameStart}
        onReceiveMessage={handleReceiveMessage}
        onClickMulti={handleMultiGameStart}
        gameState={gameState}
      />
    )
  }
}

export default connect(
  (state) => ({ 
    userInfo: state.playGround.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    gameState: state.playGround.gameState
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(GameControlContainer);