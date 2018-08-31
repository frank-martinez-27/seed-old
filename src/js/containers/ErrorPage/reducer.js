import { ACTIONS } from '../../constants';

const initialState = {
  payload: [],
};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOG_ERRORS:
      return {
        ...state,
        payload: [...state.payload, action.error],
      };
    case ACTIONS.RESET_ERRORS:
      return {
        ...state,
        payload: [],
      };
    default:
      return state;
  }
}
