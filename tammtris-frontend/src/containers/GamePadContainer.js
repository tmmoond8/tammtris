import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GamePad from 'components/GamePad';
import Actions from 'store/modules';

class GamePadContainer extends Component {
  constructor(props) {
    super(props);
    this.playGroundActions = this.props.PlayGroundActions();
  }

  handleTouchEvent = (e, keyCode) => {
    this.playGroundActions.playerKeyDown(keyCode);
  }

  render() {
    const { handleTouchEvent } = this;
    return (
      <GamePad onTouch={handleTouchEvent}/>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
  })
)(GamePadContainer);