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
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);

    SocketClient.addEventOn('message', (msg) => {
      const { userInfo } = this.props;
      this.broadcastActions.addChattingMessage({...msg, userInfo})
    });
  }

  componentDidMount() {
    if(document.body.scrollWidth < 1024) {
      const { playGroundActions } = this;
      playGroundActions.toggleControl();
    }
  }

  toggleControlHandler = () => {
    const { playGroundActions } = this;
    playGroundActions.toggleControl();
  }

  render() {
    const { userInfo, chattingMessages, lobbyData, isVisibleControl } = this.props;
    const { toggleControlHandler } = this;

    return (
      <LobbyControl 
        userInfo={userInfo} 
        waitingUserList={lobbyData.waitingUserList}
        chattingMessages={chattingMessages}
        onToggleControl={toggleControlHandler}
        isVisibleControl={isVisibleControl}
      />
    )
  }
}

export default connect(
  (state) => ({ 
    userInfo: state.broadcast.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    lobbyData: state.broadcast.lobbyData,
    isVisibleControl: state.playGround.isVisibleControl
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(LobbyControlContainer);