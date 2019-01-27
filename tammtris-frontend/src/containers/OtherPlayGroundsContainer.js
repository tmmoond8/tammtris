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
  }
  render() {
    const { allGroundData, userInfo } = this.props;
    const addIndex = (allGroundData) => allGroundData.map((item, index) => ({...item, number : index + 1}));
    const filterMe = (allGroundData) => allGroundData.filter((data) => !data || data.id !== userInfo.id).slice(0, 5)
    
    return (
      <OtherPlayGrounds allGroundData={filterMe(addIndex(allGroundData))}/>
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