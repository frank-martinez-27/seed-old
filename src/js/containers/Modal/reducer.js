import { ACTIONS, MODALS } from '../../constants';

const initialState = {
  modal: MODALS.NONE,
};

export default function currentModal(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SHOW_MODAL:
      if (!MODALS[action.modal]) {
        return {
          modal: MODALS.NONE,
        };
      }
      return {
        modal: action.modal,
        commentIndex: action.commentIndex,
        actionType: action.actionType,
      };
    case ACTIONS.HIDE_MODAL:
      return {
        modal: MODALS.NONE,
      };
    default:
      return state;
  }
}
