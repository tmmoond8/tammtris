import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OtherPlayGrounds from 'components/OtherPlayGrounds';
import SocketClient from 'lib/SocketClient';
import Actions from 'store/modules';
import PlayGroundContainer from 'containers/PlayGroundContainer';

class OtherPlayGroundsContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
  }

  componentDidMount() {
    if(document.body.scrollWidth < 1024) {
      const { playGroundActions } = this;
      playGroundActions.toggleControl();
    }
  }

  render() {
    const { allGroundData, userInfo } = this.props;
    const addIndex = (allGroundData) => allGroundData.map((item, index) => ({...item, number : index + 1}));
    const filterMe = (allGroundData) => allGroundData.filter((data) => !data || data.id !== userInfo.id).slice(0, 5)
    
    return (
      <OtherPlayGrounds
        allGroundData={filterMe(addIndex(allGroundData))}
        PlayGroundContainer={PlayGroundContainer}
        />
    )
  }
}

export default connect(
  (state) => ({
    allGroundData: state.broadcast.allGroundData,
    userInfo: state.broadcast.userInfo    
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(OtherPlayGroundsContainer);