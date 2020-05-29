import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Rewards from './components/Rewards/Rewards'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Rewards} />
        </Switch>
      </BrowserRouter>
    )
  }
}
