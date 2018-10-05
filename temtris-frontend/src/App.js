import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayContainer from 'containers/GamePlayContainer';
import LobbyPage from 'pages/LobbyPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LobbyPage}/>
          <Route path="/game/:id" component={GamePlayContainer}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
