import React from 'react';
import LobbyContainer from 'containers/LobbyContainer';
import LobbyControlContainer from 'containers/LobbyControlContainer';

const LobbyPage = () => {
  const style = {
    display: 'flex',
    flexDirection: 'row'
  }

  return (
    <div style={style}>
      <LobbyContainer/>
      <LobbyControlContainer/>
    </div>
  )
}

export default LobbyPage;