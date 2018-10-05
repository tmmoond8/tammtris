import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayContainer from 'containers/GamePlayContainer';
import LobbyContainer from 'containers/LobbyContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LobbyContainer}/>
          <Route path="/game/:id" component={GamePlayContainer}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
