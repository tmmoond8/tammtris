import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import * as playGroundActions from '../store/modules/playGround'

class PlayGroundContainer extends Component {

  handlePlayerKeyDown = (keyCode) => {
    this.props.PlayGroundActions().playerKeyDown(keyCode);
    // !this.isGameStart && this.props.PlayGroundActions().gameStart()
  }

  handleGameStart = () => {
    this.props.PlayGroundActions().gameStart();
  }

  render() {
    const { handlePlayerKeyDown, handleGameStart } = this;
    const { gameGroundData, playerBlocks} = this.props;

    return (
      <PlayGround
        gameGroundData={gameGroundData}
        playerBlocks={playerBlocks}
        onPlayerKeyDown = {handlePlayerKeyDown}
        onGameStart = {handleGameStart}
      />
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(playGroundActions, dispatch)
  })
)(PlayGroundContainer);