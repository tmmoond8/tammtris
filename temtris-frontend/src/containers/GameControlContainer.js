import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GameControl from '../components/GameControl';
import Actions from '../store/modules';

class GameControlContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GameControl/>
    )
  }
}

export default GameControlContainer;