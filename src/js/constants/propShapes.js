import PropTypes from 'prop-types';

export const FetchedDataInitialState = {
  isFetching: false,
  error: {
    status: false,
    payload: {
      response: {},
    },
  },
};

export const FetchedDataArrayInitialState = {
  ...FetchedDataInitialState,
  payload: [],
};

export const FetchedDataObjectInitialState = {
  ...FetchedDataInitialState,
  payload: {},
};

export const FetchedDataShape = {
  isFetching: PropTypes.bool,
  paginationAction: PropTypes.string,
  payload: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.object,
};

export const fetchedDataError = action => ({
  status: true,
  payload: action.error,
});
