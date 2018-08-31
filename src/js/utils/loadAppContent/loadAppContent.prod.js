// fetch externally hosted content JSON

import { ACTIONS, API_PATHS, API_ROOTS } from '../../constants';
import callApi from '../../utils/api';

const loadAppContentRequest = () => ({
  type: ACTIONS.LOAD_APP_CONTENT_REQUEST,
});

const loadAppContentSuccess = json => ({
  type: ACTIONS.LOAD_APP_CONTENT_SUCCESS,
  payload: json,
});

const loadAppContentError = error => ({
  type: ACTIONS.LOAD_APP_CONTENT_ERROR,
  error,
});

const loadAppContent = () => dispatch => {
  dispatch(loadAppContentRequest());

  callApi(API_ROOTS.GITHUB_PAGES, API_PATHS.CONTENT).then(
    json => dispatch(loadAppContentSuccess(json)),
    error => dispatch(loadAppContentError(error))
  );
};

export default loadAppContent;
