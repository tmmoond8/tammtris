import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LobbyControl from 'components/LobbyControl';
import Actions from 'store/modules';
import SocketClient from 'lib/SocketClient';

class LobbyControlContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);

    SocketClient.addEventOn('message', (msg) => {
      const { userInfo } = this.props;
      this.broadcastActions.addChattingMessage({...msg, userInfo})
    });
  }

  render() {
    const { userInfo, chattingMessages, lobbyData } = this.props;

    return (
      <LobbyControl 
        userInfo={userInfo} 
        waitingUserList={lobbyData.waitingUserList}
        chattingMessages={chattingMessages}
      />
    )
  }
}

export default connect(
  (state) => ({ 
    userInfo: state.broadcast.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    lobbyData: state.broadcast.lobbyData
  }),
  (dispatch) => ({
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(LobbyControlContainer);