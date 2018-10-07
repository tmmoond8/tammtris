import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from 'components/PlayGround';
import Actions from 'store/modules'
import SocketClient from 'lib/SocketClient';
import { GAME_STATE } from 'utils/gameDataManager';

class PlayGroundContainer extends Component {
  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    
    SocketClient.addEventOn('game/data', (response) => {
      this.broadcastActions.setAllPlayData(response)
    });
  }

  handlePlayerKeyDown = (keyCode) => {
    if(this.props.gameState === GAME_STATE.GAME_OVER) return;
    this.playGroundActions.playerKeyDown(keyCode);
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.downStop) {
      if(this.props.playerBlocks.baseBlock.equlas(nextProps.playerBlocks.baseBlock)) {
        return true;
      }
      SocketClient.sendMessage('game/data', {
        userInfo: nextProps.userInfo,
        gameData: nextProps.gameGroundData,
        gameState: nextProps.gameState,
        gameNumber: nextProps.gameRoom.gameNumber
      });
    }
    
    return true;
  }

  render() {
    const { handlePlayerKeyDown } = this;
    const { allGroundData, gameGroundData, playerBlocks, userInfo, gameState } = this.props;
    let index = allGroundData.findIndex(item => !!item && item.id === userInfo.id);
    
    return (
      <PlayGround
          gameGroundData = {gameGroundData}
          userIndex={index + 1}
          playerBlocks = {playerBlocks}
          userInfo = {allGroundData[index] ? allGroundData[index] : userInfo}
          onPlayerKeyDown = {handlePlayerKeyDown}
          gameState = {gameState}
        />
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks,
    gameState: state.playGround.gameState,
    downStop: state.playGround.downStop,
    userInfo: state.broadcast.userInfo,
    chattingMessages: state.broadcast.chattingMessages,
    gameRoom: state.broadcast.gameRoom,
    allGroundData: state.broadcast.allGroundData,    
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(PlayGroundContainer);