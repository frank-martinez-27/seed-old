import React from 'react';
import Icon from '../../components/Icon';
import logo from '../../../assets/images/logo.svg';
import Button from '@material-ui/core/Button';

export default function ReactMain() {
  return (
    <div className="App">
      <header className="App-header" data-testid="header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title" data-testid="title">
          Welcome to React
        </h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
        <Icon icon="icon-newspaper" />
      </p>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}
