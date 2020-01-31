import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import TeamSelectButtons from '../components/TeamSelectButtons';
import { connect } from 'react-redux';
import { GAME_STATE } from '../utils/gameDataManager';
import SocketClient from '../lib/SocketClient';
import Actions from '../store/modules';

class TeamSelectButtonsContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    SocketClient.addEventOn('game/teamChange', (response) => {
      const { broadcastActions } = this;
      broadcastActions.changeTeam(response);
    });
  }

  handleChangeTeam = (team) => {
    const { userInfo, gameState } = this.props;
    if (gameState === GAME_STATE.PLAY) return;
    SocketClient.sendMessage('game/teamChange', { userInfo, team });
  }

  isSelected = (item) => this.props.team === item;

  render() {
    const { isSelected, handleChangeTeam } = this;
    return (
      <TeamSelectButtons 
        isSelected={isSelected}
        onChangeTeam={handleChangeTeam}
      />
    )
  }
}

export default connect(
  (state) => ({
    userInfo: state.broadcast.userInfo,
    team: state.broadcast.team,
  }),
  (dispatch) => ({
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(TeamSelectButtonsContainer);