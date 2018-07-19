import React, { Component } from 'react';
import { connect } from 'react-redux'
import PlayGround from '../components/PlayGround';
import * as playGroundActions from '../store/modules/playGround'

class PlayGroundContainer extends Component {
  handleGameGroundData = () => {
    this.props.setGameGroundData();
  }

  handlePlayerBlocks = () => {
    this.props.setPlayerBlocks();
  }

  render() {
    const { handleGameGroundData, handlePlayerBlocks } = this;
    const { gameGroundData } = this.props;

    return (
      <PlayGround
        gameGroundData={gameGroundData}
        onSetGameGroundData = {this.handleGameGroundData}
        onSetPlayerBlocks = {this.handlePlayerBlocks}
      />
    );
  }
}

export default connect(
  (state) => { gameGroundData: state.playGround.gameGroundData},
  (dispatch) => {
    setGameGroundData: () => dispatch(playGroundActions.setGameGroundData())
    setPlayerBlocks: () => dispatch(playGroundActions.setPlayerBlocks)
  }
)(PlayGroundContainer);