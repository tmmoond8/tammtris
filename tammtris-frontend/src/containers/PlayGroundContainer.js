import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import Actions from '../store/modules'
import SocketClient from '../lib/SocketClient';
import { GAME_STATE } from '../utils/gameDataManager';

class PlayGroundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyEvent: 'default'
    }
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    
    SocketClient.addEventOn('game/allData', (response) => {
      this.broadcastActions.setAllPlayData(response);
    });

    SocketClient.addEventOn('game/data', (response) => {
      this.broadcastActions.setPlayData(response);
    });

    SocketClient.addEventOn('game/itemUse', (response) => {
      //TODO 이펙트 broadcast
      const { userInfo } = this.props;
      this.playGroundActions.gameItemUse({ ...response, me : userInfo.number });
    });
    
    SocketClient.addEventOn('game/blockUp', (response) => {
      this.playGroundActions.gameBlockUp(response);
    });

    // this.niceEventLister().addEventListener();
    this.quickEventListenr();
    document.body.addEventListener('touchend', function(event) {
      event.preventDefault();
      if(typeof event.target.click === 'function') {
        event.target.click();
      }
    })
  }

  quickEventListenr = () => {
    var keyState = {};
    document.addEventListener('keydown', (e) => {
      if (e.code.includes('Arrow') && e.code !== 'ArrowUp') {
        keyState[e.keyCode] = e.code;
      } else {
        this.handlePlayerKeyDown(e);
      }
    },true);
    document.addEventListener('keyup',(e) => {
        keyState[e.keyCode] = '';
    },true);
    const timer = 70;
    const moveLoop = () => {
      if (keyState[40]){
        this.handlePlayerKeyDown({ code: keyState[40], keyCode: 40 });
      }
      if (keyState[39]){
        this.handlePlayerKeyDown({ code: keyState[39], keyCode: 39 });
      }
      if (keyState[37]){
        this.handlePlayerKeyDown({ code: keyState[37], keyCode: 37 });
      }
      setTimeout(moveLoop, timer);
    }
    moveLoop();
  }

  handlePlayerKeyDown = ({ code }) => {
    if(this.props.gameState !== GAME_STATE.PLAY) return;
    if(code.startsWith('Digit')) {
      const { allGroundData, userInfo, gameItems } = this.props;
      if(!Array.isArray(gameItems) || gameItems.length === 0) return;
      const to = Number.parseInt(code.charAt('5'));
      if(to > 6 || !allGroundData[to - 1]) return;
      SocketClient.sendMessage('game/itemUse', {
        from: userInfo.number,
        to,
        item: gameItems[0]
      });
    } else if(code.startsWith('Equal')) {
      this.switchKeyEvent();
    } else {
      debugger;
      this.playGroundActions.playerKeyDown(code);
    }
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.downStop) {
      const prevBlocks = this.props.playerBlocks.baseBlock;
      const nextBlocks = nextProps.playerBlocks.baseBlock;
      if(prevBlocks.x !== nextBlocks.x 
        || prevBlocks.y !== nextBlocks.y 
        || prevBlocks.dot !== nextBlocks.dot) {
          SocketClient.sendMessage('game/data', {
            userInfo: nextProps.userInfo,
            gameData: nextProps.gameGroundData,
            gameState: nextProps.gameState,
            gameNumber: nextProps.gameRoom.gameNumber,
            gameItems: nextProps.gameItems
          });
        return true;
      }
    }
    
    return true;
  }

  render() {
    const { handlePlayerKeyDown } = this;
    const { allGroundData, gameGroundData, playerBlocks, userInfo, gameState, gameItems } = this.props;
    const index = userInfo.number - 1;
    
    return (
      <PlayGround
          gameGroundData = {gameGroundData}
          userIndex={userInfo.number || 0}
          playerBlocks={playerBlocks}
          userInfo={allGroundData[index] ? allGroundData[index] : userInfo}
          onPlayerKeyDown={handlePlayerKeyDown}
          gameState={gameState}
          gameItems={gameItems}
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
    gameItems: state.playGround.gameItems,
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(PlayGroundContainer);