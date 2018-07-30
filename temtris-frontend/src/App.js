import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePlayPage from './components/pages/GamePlayPage/GamePlayPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={GamePlayPage}/>
      </BrowserRouter>
    );
  }
}

export default App;
