import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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

    SocketClient.addEventOn('game/start', ({ mapData }) => {
      const { playGroundActions } = this;
      playGroundActions.gameStart({
        autoDown: () => playGroundActions.playerKeyDown('ArrowDown'),
        mapData
      });
    });
    SocketClient.addEventOn('game/result', (response) => {
      const { playGroundActions } = this;
      playGroundActions.gameResult(response);
    });
  }

  componentDidMount() {
    const { userInfo, gameRoom, history } = this.props;
    if (userInfo.name === 'guest') {
      // FIXME UI를 위해 임시 처리
      this.broadcastActions.setUserInfo(JSON.parse('{"id":"b24763f0-2754-11e9-8d8d-b75a63aa932e","name":"chicken","emoji":"🐔","number":1}'))
      // history.replace('/');
      return;
    }
    SocketClient.sendMessage('game/join', {
      userInfo: userInfo,
      gameNumber: gameRoom ? gameRoom.gameNumber : 1
    });
  }
  
  handleSingleGameStart = () => {
    const { playGroundActions } = this;
    playGroundActions.gameStart({
      autoDown: () => playGroundActions.playerKeyDown('ArrowDown')
    });
  }

  handleMultiGameStart = () => {
    const { userInfo } = this.props;
    SocketClient.sendMessage('game/start', { userInfo });
  }

  toggleControlHandler = (isVisible) => {
    const { playGroundActions } = this;
    playGroundActions.toggleControl(isVisible);
  }

  render() {
    const { handleSingleGameStart, handleMultiGameStart, toggleControlHandler } = this;
    const { userInfo, chattingMessages, gameState, isVisibleControl } = this.props;

    return (
      <GameControl 
        userInfo={userInfo} 
        chattingMessages={chattingMessages}
        onClickSingle={handleSingleGameStart}
        onClickMulti={handleMultiGameStart}
        gameState={gameState}
        isVisibleControl={isVisibleControl}
        onToggleControl={toggleControlHandler}
      />
    )
  }
}

export default connect(
  (state) => ({ 
    gameState: state.playGround.gameState,
    userInfo: state.broadcast.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    gameRoom: state.broadcast.gameRoom,
    isVisibleControl: state.playGround.isVisibleControl,
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(withRouter(GameControlContainer));