import React from 'react';
import GamePlayContainer from 'containers/GamePlayContainer';
import GameControlContainer from 'containers/GameControlContainer';

const GamePlayPage = () => {
  const style = {
    display: 'flex',
    flexDirection: 'row'
  }

  return (
    <div style={style}>
      <GamePlayContainer/>
      <GameControlContainer/>
    </div>
  )
}

export default GamePlayPage;