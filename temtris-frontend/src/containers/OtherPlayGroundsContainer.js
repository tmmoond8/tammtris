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
    const { allGroundData } = this.props;
    return (
      <OtherPlayGrounds allGroundData={allGroundData}/>
    )
  }
}

export default connect(
  (state) => ({
    allGroundData: state.broadcast.allGroundData,    
  }),
  (dispatch) => ({
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(OtherPlayGroundsContainer);