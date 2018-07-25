import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import Chat from '../components/Chat';
import * as playGroundActions from '../store/modules/playGround'

class PlayGroundContainer extends Component {

  handlePlayerKeyDown = (keyCode) => {
    const PlayGroundActions = this.props.PlayGroundActions();
    PlayGroundActions.playerKeyDown(keyCode);
    PlayGroundActions.gameStart(() => PlayGroundActions.playerKeyDown('ArrowDown'));
  }

  handleGameStart = () => {
    this.props.PlayGroundActions().gameStart();
  }

  render() {
    const { handlePlayerKeyDown, handleGameStart } = this;
    const { gameGroundData, playerBlocks, userInfo, chattingMessages, PlayGroundActions} = this.props;

    return (
      <div>
        <PlayGround
          gameGroundData={gameGroundData}
          playerBlocks={playerBlocks}
          userInfo={userInfo}
          onPlayerKeyDown = {handlePlayerKeyDown}
          onGameStart = {handleGameStart}
        />
        <Chat userInfo={userInfo} chattingMessages={chattingMessages} PlayGroundActions={PlayGroundActions}/>
      </div>
      
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks,
    chattingMessages: state.playGround.chattingMessages,
    userInfo: state.playGround.userInfo
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(playGroundActions, dispatch)
  })
)(PlayGroundContainer);