import React from 'react';
import LobbyContainer from 'containers/LobbyContainer';
import LobbyControlContainer from 'containers/LobbyControlContainer';

const LobbyPage = () => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div style={style}>
      <LobbyContainer/>
      <LobbyControlContainer/>
    </div>
  )
}

export default LobbyPage;