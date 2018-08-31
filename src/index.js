import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import './styles/index.css';
import App from './js/containers/App';
import registerServiceWorker from './registerServiceWorker';
import Localization from './js/containers/Localization';
import { configureStore, history } from './js/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Localization>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Localization>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
