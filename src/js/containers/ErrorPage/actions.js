import { push } from 'react-router-redux';
import { ACTIONS, MODALS, HTTP, ROUTE_PATHS } from '../../constants';
import { showModal, hideModal } from '../../containers/Modal/actions';
import { formatErrorMessage } from '../../utils';
import { redirectToUrl } from '../../containers/Authorization/actions';

// ERRORS
const logError = error => ({
  type: ACTIONS.LOG_ERRORS,
  error,
});

export const handleError = error => (dispatch, getState) => {
  dispatch(logError(error));

  const state = getState();
  if (state.currentModal && state.currentModal.modal !== MODALS.ERROR) {
    dispatch(showModal(MODALS.ERROR));
  }
};

const routeToErrorPage = error => dispatch => {
  const errorMessage = formatErrorMessage(error);
  dispatch(push(ROUTE_PATHS.ERROR, errorMessage.message));
};

export const handleApiError = (error = {}) => dispatch => {
  // parse error response, default to handleError()
  try {
    const errorResponse = error.response ? error.response : new Response(new Blob());
    const errorResponsePromise = errorResponse.json();

    switch (errorResponse.status) {
      case HTTP.STATUS.UNAUTHORIZED:
        // redirect to execution
        redirectToUrl();
        break;
      case HTTP.STATUS.FORBIDDEN:
        // route to error page
        errorResponsePromise.then(e => {
          dispatch(routeToErrorPage(e));
        });
        break;
      default:
        // show error modal
        errorResponsePromise.then(e => dispatch(handleError(formatErrorMessage(e))));
    }
  } catch (e) {
    dispatch(handleError(formatErrorMessage(e)));
  }
};

export const resetErrors = () => ({
  type: ACTIONS.RESET_ERRORS,
});

export const hideErrorModal = () => dispatch => {
  dispatch(resetErrors());
  dispatch(hideModal());
};

export const exitErrorModal = () => dispatch => {
  dispatch(hideErrorModal());
  dispatch(push(ROUTE_PATHS.INDEX));
};
