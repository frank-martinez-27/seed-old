import { MODALS } from '../constants';
import { hideErrorModal } from '../containers/ErrorPage/actions';

// if route changes, check for open modal and close it
const closeModal = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    if (state.currentModal.modal !== MODALS.NONE) {
      // reset error log, hide any open modal
      store.dispatch(hideErrorModal());
    }
  }
  return next(action);
};

export default closeModal;
