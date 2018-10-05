import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Lobby from 'components/Lobby';
import SocketClient from 'lib/SocketClient';
import Actions from 'store/modules'

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
      this.broadcastActions.setUserInfo(userInfo);
    });
    SocketClient.addEventOn('lobby/data', (lobbyData) => {
			this.broadcastActions.setLobbyData(lobbyData);
    });
    SocketClient.addEventOn('game/check', (response) => {
      if (response !== null) {
        this.broadcastActions.setGameRoom(response);
        const { history } = this.props;
        history.push(`/game/${response.gameNumber}`)
      }
    });
  }

  handleGameJoin(gameNumber) {
    // room number에 방이 있는지 확인 후 바로 입장
    SocketClient.sendMessage('game/check', { gameNumber });
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
    return (
			<div style={style}>
				<Lobby lobbyData={lobbyData} onGameJoin={handleGameJoin}/>	
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
)(withRouter(LobbyContainer));