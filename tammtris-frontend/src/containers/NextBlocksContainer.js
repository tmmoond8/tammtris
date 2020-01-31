import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../store/modules'
import NextBlocks from '../components/NextBlocks';

class NextBlocksContainer extends Component {

  constructor(props) {
    super(props);
    this.playGroundActions = this.props.PlayGroundActions();
  }
  render() {
    const { nextBlocks } = this.props;
    const nextShapes = nextBlocks && nextBlocks.map(blocks => blocks.getShape());
    return (
      <NextBlocks nextShapes={nextShapes}/>
    )
  }
}

export default connect(
  (state) => ({
    nextBlocks: state.playGround.nextBlocks
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
  })
)(NextBlocksContainer);