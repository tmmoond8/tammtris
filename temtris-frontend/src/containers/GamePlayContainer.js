import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import GamePlay from '../components/GamePlay';
import Actions from '../store/modules'
import gameAPI from '../api/gamePlay';
import SocketClient from '../lib/SocketClient';
import { GAME_STATE } from '../utils/gameDataManager';

class GamePlayContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    
    SocketClient.addEventOn('game_data', (response) => {
      this.broadcastActions.allGroundData(response)
    });
  }

  handlePlayerKeyDown = (keyCode) => {
    if(this.props.gameState === GAME_STATE.GAME_OVER) return;
    this.playGroundActions.playerKeyDown(keyCode);
  }

  componentDidMount() {
    gameAPI.join().then((response) => {
      const {data: userInfo } = response;
      this.playGroundActions.userInfo(userInfo);
      SocketClient.sendMessage('join', {
        userInfo,
        chattingRoom: 'openChatting'
      });
    }).catch(err => {
        console.error(err);
    })
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.downStop) {
      if(this.props.playerBlocks.baseBlock.equlas(nextProps.playerBlocks.baseBlock)) {
        return true;
      }
      SocketClient.sendMessage('game_data', {
        userInfo: nextProps.userInfo,
        gameData: nextProps.gameGroundData,
        gameState: nextProps.gameState
      });
    }
    
    return true;
  }

  render() {
    const { handlePlayerKeyDown, broadcastActions } = this;
    const { gameGroundData, playerBlocks, userInfo, chattingMessages, gameState, allGroundData} = this.props;

    return (
      <GamePlay 
        gameGroundData={gameGroundData}
        playerBlocks={playerBlocks}
        userInfo={userInfo}
        onPlayerKeyDown = {handlePlayerKeyDown}
        gameState = {gameState}
        allGroundData={allGroundData}
        chattingMessages={chattingMessages} 
        broadcastActions={broadcastActions}
      /> 
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks,
    userInfo: state.playGround.userInfo,
    gameState: state.playGround.gameState,
    downStop: state.playGround.downStop,
    chattingMessages: state.broadcast.chattingMessages,
    allGroundData: state.broadcast.allGroundData
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(GamePlayContainer);