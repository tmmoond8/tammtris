import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import * as playGroundActions from '../store/modules/playGround'
import gameAPI from '../api/gamePlay';

class PlayGroundContainer extends Component {

  handlePlayerKeyDown = (keyCode) => {
    const playGroundActions = this.props.PlayGroundActions();
    playGroundActions.playerKeyDown(keyCode);
    playGroundActions.gameStart(() => playGroundActions.playerKeyDown('ArrowDown'));
  }

  handleGameStart = () => {
    this.props.PlayGroundActions().gameStart();
  }

  componentDidMount() {
    gameAPI.join().then((response) => {
      const playGroundActions = this.props.PlayGroundActions();
      playGroundActions.playerInfo(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { handlePlayerKeyDown, handleGameStart } = this;
    const { gameGroundData, playerBlocks, userInfo} = this.props;

    return (
      <PlayGround
          gameGroundData={gameGroundData}
          playerBlocks={playerBlocks}
          userInfo={userInfo}
          onPlayerKeyDown = {handlePlayerKeyDown}
          onGameStart = {handleGameStart}
      />
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks,
    userInfo: state.playGround.userInfo
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(playGroundActions, dispatch)
  })
)(PlayGroundContainer);