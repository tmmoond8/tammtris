import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Lobby from '../components/Lobby';
import SocketClient from '../lib/SocketClient';
import Actions from '../store/modules'
import LobbyControlContainer from './LobbyControlContainer';

class LobbyContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    }
    this.broadcastActions = this.props.broadcastActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    // 여기에 이벤트 등록
    SocketClient.addEventOn('lobby/join', (userInfo) => {
      this.broadcastActions.userInfo(userInfo);
    });
    SocketClient.addEventOn('lobby/data', (lobbyData) => {
			this.broadcastActions.lobbyData(lobbyData);
    });
    SocketClient.addEventOn('game/check', (response) => {
      if (response !== null) {
        this.broadcastActions.gameRoom(response);
        this.setState({
          redirect: `/game/${response.number}`
        })
      }
    });
  }

  handleGameJoin(roomNumber) {
    // room number에 방이 있는지 확인 후 바로 입장
    SocketClient.sendMessage('game/check', { roomNumber });
  }

  componentDidMount() {
    // 오픈 채팅방 입장
    // 이쪽에서 SocketIO로 방 정보 가져오도록..
    SocketClient.sendMessage('lobby/join');
  }

  render() {
		const style = {
			display: 'flex',
			flexDirection: 'row'
		}
    const { lobbyData } = this.props;
    const { handleGameJoin } = this;
    const { redirect } = this.state;
    return (
			<div style={style}>
        {redirect && <Redirect to={redirect}/>}
				<Lobby lobbyData={lobbyData} onGameJoin={handleGameJoin}/>	
				<LobbyControlContainer/>
			</div>
    )
  }
}

export default connect(
  (state) => ({
		userInfo: state.broadcast.userInfo,
    lobbyData: state.broadcast.lobbyData,
  }),
  (dispatch) => ({
    broadcastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(LobbyContainer);