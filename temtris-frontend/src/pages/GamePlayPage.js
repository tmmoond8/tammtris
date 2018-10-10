import React from 'react';
import PlayGroundContainer from 'containers/PlayGroundContainer';
import GameControlContainer from 'containers/GameControlContainer';
import OtherPlayGroundsContainer from 'containers/OtherPlayGroundsContainer';
import GameResult from 'components/GameResult';

const GamePlayPage = () => {
  const style = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    background: '#f9f9f9',
    minWidth: '55rem',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  const otherPlayGroundStyle = {
    flex: 1,
    maxWidth: '30rem',
  }

  const myPlayGroundStyle = {
    margin: 'auto 1rem',
    flex: 1,
    maxWidth: '15rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div style={style}>
      <div style={otherPlayGroundStyle}>
        <OtherPlayGroundsContainer/>
      </div>
      <div style={myPlayGroundStyle}>
        <PlayGroundContainer/>
      </div>
      <GameControlContainer/>
      <GameResult/>
    </div>
  )
}

export default GamePlayPage;