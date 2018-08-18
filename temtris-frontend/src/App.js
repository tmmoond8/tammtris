import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayContainer from './containers/GamePlayContainer';
import WaitingRoomContainer from './containers/WaitingRoomContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={WaitingRoomContainer}/>
          <Route path="/game" component={GamePlayContainer}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
