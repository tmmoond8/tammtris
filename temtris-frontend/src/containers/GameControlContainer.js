import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GameControl from 'components/GameControl';
import Actions from 'store/modules';
import SocketClient from 'lib/SocketClient';


class GameControlContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();

    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);

    SocketClient.addEventOn('game/start', (response) => {
      const { playGroundActions } = this;
      playGroundActions.gameStart({
        autoDown: () => playGroundActions.playerKeyDown('ArrowDown')
      });
    });
    SocketClient.addEventOn('game/result', (response) => {
      const { playGroundActions } = this;
      playGroundActions.gameResult(response);
    });
  }

  componentDidMount() {
    const { userInfo, gameRoom} = this.props;
    SocketClient.sendMessage('game/join', {
      userInfo: userInfo ? userInfo : { name: 'test', emoji: '^^'},
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


  render() {
    const { handleSingleGameStart, handleMultiGameStart } = this;
    const { userInfo, chattingMessages, gameState } = this.props;

    return (
      <GameControl 
        userInfo={userInfo} 
        chattingMessages={chattingMessages}
        onClickSingle={handleSingleGameStart}
        onClickMulti={handleMultiGameStart}
        gameState={gameState}
      />
    )
  }
}

export default connect(
  (state) => ({ 
    gameState: state.playGround.gameState,
    userInfo: state.broadcast.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    gameRoom: state.broadcast.gameRoom
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(GameControlContainer);