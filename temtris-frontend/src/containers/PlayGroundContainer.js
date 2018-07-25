import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import Chat from '../components/Chat';
import * as playGroundActions from '../store/modules/playGround'
import gameAPI from '../api/gamePlay';
import io from 'socket.io-client';

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
    

    let socket = io('http://localhost:8080');
    // console.log('socket io client', Config.socketClient.baseURL);
    socket.on('connect', () => {
        console.log('socket connect');
    });
    socket.on('disconnect', () => {
        console.log('socket disconnect');
    });
  }

  render() {
    const { handlePlayerKeyDown, handleGameStart } = this;
    const { gameGroundData, playerBlocks, userInfo, chattingMessages} = this.props;

    return (
      <div>
        <PlayGround
          gameGroundData={gameGroundData}
          playerBlocks={playerBlocks}
          userInfo={userInfo}
          onPlayerKeyDown = {handlePlayerKeyDown}
          onGameStart = {handleGameStart}
        />
        <Chat userInfo={userInfo} chattingMessages={chattingMessages}/>
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