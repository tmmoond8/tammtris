import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import WaitingRoom from '../components/WaitingRoom';
import SocketClient from '../lib/SocketClient';
import Actions from '../store/modules'
import WaitingControlContainer from './WaitingControlContainer';

class WaitingRoomContainer extends Component {

  constructor(props) {
    super(props);
    this.broadcastActions = this.props.broadcastActions();
    // this.playGroundActions = this.props.playGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    // 여기에 이벤트 등록
    SocketClient.addEventOn('waitingRoom/join', (userInfo) => {
      this.broadcastActions.userInfo(userInfo);
    });
    SocketClient.addEventOn('waitingRoom/data', (waitingRoomData) => {
			console.log(waitingRoomData);
			this.broadcastActions.waitingRoomData(waitingRoomData);
    })
  }

  componentDidMount() {
    // 오픈 채팅방 입장
    // 이쪽에서 SocketIO로 방 정보 가져오도록..
    SocketClient.sendMessage('waitingRoom/join');
  }

  render() {
		const style = {
			display: 'flex',
			flexDirection: 'row'
		}
		const { waitingRoomData } = this.props;
    return (
			<div style={style}>
				<WaitingRoom waitingRoomData={waitingRoomData}/>	
				<WaitingControlContainer/>
			</div>
    )
  }
}

export default connect(
  (state) => ({
    // 방정보를 가져오겠지.
		userInfo: state.broadcast.userInfo,
		waitingRoomData: state.broadcast.waitingRoomData
  }),
  (dispatch) => ({
    broadcastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(WaitingRoomContainer);