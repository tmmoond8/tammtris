import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameResult from 'components/GameResult';
import Actions from 'store/modules';

class GameResultContainer extends Component {

  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
  }

  handleClick = () => {
    this.playGroundActions.gameResult();
  }

  render() {
    const { handleClick } = this;
    const { team, gameResult } = this.props;
    
    if (!gameResult) return null;

    return (
      <GameResult handleClick={handleClick} team={team} result={gameResult}/>
    )
  }
}

export default connect(
  (state) => ({
    team: state.broadcast.team,
    gameResult: state.playGround.gameResult,
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(GameResultContainer);