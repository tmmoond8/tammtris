import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import OtherPlayGrounds from '../components/OtherPlayGrounds';
import Chat from '../components/Chat';
import * as playGroundActions from '../store/modules/playGround'
import gameAPI from '../api/gamePlay';
import GameDataManager from '../utils/gameDataManager';
import block from '../models/block';


class PlayGroundContainer extends Component {

  constructor(props) {
    super(props);
    this.playGroundActions = this.props.PlayGroundActions();
  }

  handlePlayerKeyDown = (keyCode) => {
    this.playGroundActions.playerKeyDown(keyCode);
    this.playGroundActions.gameStart(() => this.playGroundActions.playerKeyDown('ArrowDown'));
  }

  handleGameStart = () => {
    this.playGroundActions.gameStart();
  }

  componentDidMount() {
    gameAPI.join().then((response) => {
      this.playGroundActions.userInfo(response.data);
    }).catch(err => {
        console.error(err);
    })
  }

  render() {
    const { handlePlayerKeyDown, handleGameStart } = this;
    const { gameGroundData, playerBlocks, userInfo, chattingMessages, PlayGroundActions, allGroundData} = this.props;

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
        <OtherPlayGrounds allGroundData={allGroundData}/>
      </div>
      
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks,
    chattingMessages: state.playGround.chattingMessages,
    userInfo: state.playGround.userInfo,
    allGroundData: state.playGround.allGroundData
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(playGroundActions, dispatch)
  })
)(PlayGroundContainer);