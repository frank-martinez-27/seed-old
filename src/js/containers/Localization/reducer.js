import { ACTIONS } from '../../constants';
import { FetchedDataObjectInitialState, fetchedDataError } from '../../constants/propShapes';
import contentJson from '../../constants/content.json';

export const initialState = {
  ...FetchedDataObjectInitialState,
  // default to content JSON bundled with application
  payload: contentJson,
};

export default function content(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_APP_CONTENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.LOAD_APP_CONTENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        payload: action.payload,
        error: FetchedDataObjectInitialState.error,
      };
    case ACTIONS.LOAD_APP_CONTENT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: fetchedDataError(action),
      };
    default:
      return state;
  }
}
