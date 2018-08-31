import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import axe from 'react-axe'; // eslint-disable-line import/no-extraneous-dependencies
import rootReducer from '../reducers';
import { CONTEXT_ROOT } from '../constants';
import closeModal from '../middleware/closeModal';

export const history = createBrowserHistory({
  basename: CONTEXT_ROOT,
});
// redux middleware for intercepting and dispatching navigation actions
const routing = routerMiddleware(history);

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, routing, closeModal, createLogger())
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  axe(React, ReactDOM, 1000);

  return store;
};
