import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OtherPlayGrounds from '../components/OtherPlayGrounds';
import GameDataManager from '../utils/gameDataManager';
import block from '../models/block';
import gameAPI from '../api/gamePlay';

class OtherPlayGroundsContainer extends Component {


  render() {
    const gameData = GameDataManager.defaultGameData();
    gameData[2][3] = block.BLUE;
    gameData[1][3] = block.BLUE;
    gameData[6][8] = block.GRAPE;
    gameData[11][2] = block.CYAN;
    gameData[16][5] = block.GREEN;
    const gameGroundData = [];
    gameGroundData.push(gameData);
    gameGroundData.push(gameData);
    gameGroundData.push(gameData);
    gameGroundData.push(gameData);
    gameGroundData.push(gameData);
    return <OtherPlayGrounds gameGroundData={gameGroundData}/>
  }
}

export default OtherPlayGroundsContainer;