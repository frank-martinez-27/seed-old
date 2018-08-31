import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppShell from './AppShell';
import ReactMain from './reactMainPage';
import ErrorPage from '../ErrorPage';

// TODO: Implement the Error Component and NotFoundPage on the default Route
export class App extends Component {
  render() {
    return (
      <AppShell>
        <Switch>
          <Route exact path="/" component={ReactMain} />
          <Redirect exact from="/main" to="/" />
          <Route path="/error" component={ErrorPage} />
        </Switch>
      </AppShell>
    );
  }
}

export default App;
