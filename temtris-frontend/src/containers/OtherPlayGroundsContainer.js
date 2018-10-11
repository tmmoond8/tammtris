import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OtherPlayGrounds from 'components/OtherPlayGrounds';
import SocketClient from 'lib/SocketClient';
import Actions from 'store/modules';

class OtherPlayGroundsContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    SocketClient.addEventOn('game/data', (response) => {
      this.broadcastActions.setAllPlayData(response)
    });
  }
  render() {
    const { allGroundData, userInfo } = this.props;
    const otherPlayerData = allGroundData.filter((data) => !data || data.id !== userInfo.id).slice(0, 5);
    
    return (
      <OtherPlayGrounds allGroundData={otherPlayerData}/>
    )
  }
}

export default connect(
  (state) => ({
    allGroundData: state.broadcast.allGroundData,
    userInfo: state.broadcast.userInfo    
  }),
  (dispatch) => ({
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(OtherPlayGroundsContainer);