import { HTTP, ACTIONS, API_ROOTS, API_PATHS, QUERY_STRING_PARAM } from '../../constants';
import { isEmpty } from '../../utils';
import redirectToExternalUrl from '../../utils/redirectToExternalUrl';
import callApi from '../../utils/api';

export const redirectToUrl = url => {
  switch (url) {
    case 'LOGIN':
      redirectToExternalUrl('myApp/login');
      break;
    case 'MAIN':
      redirectToExternalUrl('myApp');
      break;
    default:
      redirectToExternalUrl('myApp');
      break;
  }
};
// TODO: Eliminate magic strings
export const authorizeErrorRedirect = error => {
  switch (error.response && error.response.status) {
    case HTTP.STATUS.BAD_REQUEST:
      redirectToUrl('LOGIN');
      break;
    case HTTP.STATUS.UNAUTHORIZED:
      redirectToUrl('LOGIN');
      break;
    default:
      redirectToUrl('MAIN');
  }
};

export const keepAliveRequest = () => ({
  type: ACTIONS.KEEP_ALIVE_REQUEST,
});

export const keepAliveSuccess = json => ({
  type: ACTIONS.KEEP_ALIVE_SUCCESS,
  payload: json,
});

export const keepAliveError = error => ({
  type: ACTIONS.KEEP_ALIVE_ERROR,
  error,
});

export const keepAlive = resetAction => dispatch => {
  dispatch(keepAliveRequest());

  const options = {
    method: HTTP.REQUEST_METHOD.GET,
    headers: {
      [HTTP.HEADER_FIELD.CONTENT_TYPE]: HTTP.MIME_TYPE.JSON,
    },
  };

  callApi(API_ROOTS.MY_APP, API_PATHS.KEEP_ALIVE, options).then(
    json => {
      dispatch(keepAliveSuccess(json));
      if (resetAction && typeof resetAction === 'function') {
        resetAction();
      }
    },
    error => keepAliveError(error)
  );
};

export const authorizeRequest = () => ({
  type: ACTIONS.AUTHORIZE_REQUEST,
});

export const authorizeSuccess = json => {
  const isAuthenticated = !isEmpty(json.userInfo); // user is not empty

  return {
    type: ACTIONS.AUTHORIZE_SUCCESS,
    payload: json,
    isAuthenticated,
  };
};

export const authorizeError = error => ({
  type: ACTIONS.AUTHORIZE_ERROR,
  error,
});

export const getUserInfoSuccess = json => {
  return {
    type: ACTIONS.SET_USER_PROFILE,
    payload: json.payload,
  };
};

export const getUserInfo = () => dispatch => {
  const options = {
    method: HTTP.REQUEST_METHOD.GET,
    headers: {
      [HTTP.HEADER_FIELD.CONTENT_TYPE]: HTTP.MIME_TYPE.JSON,
    },
  };

  callApi(API_ROOTS.MY_APP, API_PATHS.USER_PROFILE, options).then(
    json => dispatch(getUserInfoSuccess(json)),
    error => {
      dispatch(authorizeError(error));
    }
  );
};

export const authorize = () => dispatch => {
  dispatch(authorizeRequest());

  const options = {
    method: HTTP.REQUEST_METHOD.GET,
    headers: {
      [HTTP.HEADER_FIELD.CONTENT_TYPE]: HTTP.MIME_TYPE.JSON,
    },
  };

  callApi('', API_PATHS.AUTH_USER, options).then(
    json => {
      dispatch(authorizeSuccess(json));
      dispatch(getUserInfo());
    },
    error => {
      dispatch(authorizeError(error));
      authorizeErrorRedirect(error);
    }
  );
};
