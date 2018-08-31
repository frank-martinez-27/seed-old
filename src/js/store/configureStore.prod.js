import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { CONTEXT_ROOT } from '../constants';
import closeModal from '../middleware/closeModal';

export const history = createBrowserHistory({
  basename: CONTEXT_ROOT,
});
const routing = routerMiddleware(history);

export const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk, routing, closeModal));
