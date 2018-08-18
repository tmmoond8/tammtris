import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WaitingControl from '../components/WaitingControl';
import Actions from '../store/modules';
import SocketClient from '../lib/SocketClient';

class WaitingControlContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
  }

  handleReceiveMessage = (msg) => {
    const { userInfo } = this.props;
    this.broadcastActions.chattingMessages({...msg, userInfo})
  }

  render() {
    const { handleReceiveMessage } = this;
    const { userInfo, chattingMessages, waitingRoomData } = this.props;

    return (
      <WaitingControl 
        userInfo={userInfo} 
        userList={waitingRoomData.userList}
        chattingMessages={chattingMessages}
        onReceiveMessage={handleReceiveMessage}
      />
    )
  }
}

export default connect(
  (state) => ({ 
    userInfo: state.broadcast.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    waitingRoomData: state.broadcast.waitingRoomData
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(WaitingControlContainer);