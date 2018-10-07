import React from 'react';
import PlayGroundContainer from 'containers/PlayGroundContainer';
import GameControlContainer from 'containers/GameControlContainer';
import OtherPlayGroundsContainer from 'containers/OtherPlayGroundsContainer';

const GamePlayPage = () => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    background: '$oc-gray-2',
    minWidth: `34 * block-sizes-for('normal')`,
    justifyContent: 'center',
    alignItems: 'center',
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
    </div>
  )
}

export default GamePlayPage;