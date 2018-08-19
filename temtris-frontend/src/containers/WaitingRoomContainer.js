import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import WaitingRoom from '../components/WaitingRoom';
import SocketClient from '../lib/SocketClient';
import Actions from '../store/modules'
import WaitingControlContainer from './WaitingControlContainer';

class WaitingRoomContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    }
    this.broadcastActions = this.props.broadcastActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    // 여기에 이벤트 등록
    SocketClient.addEventOn('waitingRoom/join', (userInfo) => {
      this.broadcastActions.userInfo(userInfo);
    });
    SocketClient.addEventOn('waitingRoom/data', (waitingRoomData) => {
			this.broadcastActions.waitingRoomData(waitingRoomData);
    });
    SocketClient.addEventOn('game/check', (response) => {
      if (response !== null) {
        this.setState({
          redirect: `/game/${response}`
        })
      }
    });
  }

  handleGameJoin(roomIndex) {
    // room number에 방이 있는지 확인 후 바로 입장
    SocketClient.sendMessage('game/check', {roomIndex});
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
    const { handleGameJoin } = this;
    const { redirect } = this.state;
    return (
			<div style={style}>
        {redirect && <Redirect to={redirect}/>}
				<WaitingRoom waitingRoomData={waitingRoomData} onGameJoin={handleGameJoin}/>	
				<WaitingControlContainer/>
			</div>
    )
  }
}

export default connect(
  (state) => ({
		userInfo: state.broadcast.userInfo,
		waitingRoomData: state.broadcast.waitingRoomData
  }),
  (dispatch) => ({
    broadcastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(WaitingRoomContainer);