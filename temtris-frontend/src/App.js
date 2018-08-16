import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayContainer from './containers/GamePlayContainer';
import GameControlContainer from './containers/GameControlContainer';
import WaitingRoomContainer from './containers/WaitingRoomContainer';

class App extends Component {
  render() {
    const style = {
      display: 'flex',
      flexDirection: 'row'
    }
    return (
      <BrowserRouter>
        <div style={style}>
          <Route exact path="/" component={WaitingRoomContainer}/>
          <Route path="/game" component={GamePlayContainer}/>
          <GameControlContainer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
