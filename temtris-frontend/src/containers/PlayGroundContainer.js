import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import Chat from '../components/Chat';
import * as playGroundActions from '../store/modules/playGround'

class PlayGroundContainer extends Component {

  constructor(props) {
    super(props);
    console.log('playGroundContainer');
    this.playGroundActions = this.props.PlayGroundActions();
  }

  handlePlayerKeyDown = (keyCode) => {
    this.playGroundActions.playerKeyDown(keyCode);
    this.playGroundActions.gameStart(() => this.playGroundActions.playerKeyDown('ArrowDown'));
  }

  handleGameStart = () => {
    this.playGroundActions.gameStart();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.userInfo && nextProps.userInfo(this.props.userInfo);
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