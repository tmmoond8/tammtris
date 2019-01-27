import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayPage from 'pages/GamePlayPage';
import LobbyPage from 'pages/LobbyPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LobbyPage}/>
          <Route path="/game/:id" component={GamePlayPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
