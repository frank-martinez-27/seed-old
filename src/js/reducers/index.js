import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentModal from '../containers/Modal/reducer';
import errors from '../containers/ErrorPage/reducer';
import content from '../containers/Localization/reducer';

const rootReducer = combineReducers({
  currentModal,
  errors,
  content,
  router: routerReducer,
});

export default rootReducer;
