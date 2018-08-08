import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GameControl from '../components/GameControl';
import Actions from '../store/modules';

class GameControlContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
  }

  render() {
    
    const { broadcastActions } = this;
    const { userInfo, chattingMessages } = this.props;

    return (
      <GameControl userInfo={userInfo} chattingMessages={chattingMessages} broadcastActions={broadcastActions}/>
    )
  }
}

export default connect(
  (state) => ({ 
    userInfo: state.playGround.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(GameControlContainer);