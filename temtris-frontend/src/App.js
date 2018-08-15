import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayPage from './components/pages/GamePlayPage';
import WaitingRoomPage from './components/pages/WaitingRoomPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={WaitingRoomPage}/>
          <Route path="/game" component={GamePlayPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
