import get from 'lodash.get';

/**
 * Trims whitespace from string
 * @param  {String} str - string to trim
 * @return {String} Returns trimmed string
 */
export const trim = str => str && str.toString().trim();

/**
 * Trims whitespace from value in object
 * @param  {Object} object - Object with value to trim
 * @param  {String} key - key/name of value to trim
 * @return {Object} Returns Object with trimmed value
 */
export const trimValue = (object, key) => {
  if (object && object[key]) {
    return {
      ...object,
      [key]: trim(object[key]),
    };
  }
  return object;
};

export const isEmpty = (obj = {}) => Object.keys(obj).length === 0;

export const formatFullName = ({ firstName = '', lastName = '' }) => `${firstName} ${lastName}`;

/**
 * Formats errors returned from /process/validate API endpoint
 * @function formatProcessError
 * @param  {Object} payload - payload from /process/validate API response
 * @param  {Array} steps - list of steps saved in app state
 * @return {Array} Returns array of error Objects with name and message
 */
export const formatProcessError = (payload, steps = []) => {
  const genericErrors = get(payload, 'generic.error', []);

  // add process level errors to list
  const errors = genericErrors.map(item => ({
    message: item,
  }));

  return errors;
};

// TODO: i18n default message
export const ERROR_MESSAGES = Object.freeze({
  DEFAULT_ERROR: 'Sorry, something went wrong. Please try again in a few moments.',
  GENERIC_NOT_FOUND: 'Resource is not found.',
});

/**
 * Formats the error message to be displayed on error modal
 * @param  {Object} error
 * @return {Object} Returns object with message as string
 */
export const formatErrorMessage = (error = {}) => {
  const { message, messageKey } = error;

  let errorMessage = '';

  if (messageKey) {
    errorMessage = ERROR_MESSAGES[messageKey];
  } else if (trim(message)) {
    errorMessage = trim(message);
  } else {
    errorMessage = ERROR_MESSAGES.DEFAULT_ERROR;
  }

  return {
    message: errorMessage,
  };
};

export const cookieNameExists = name => {
  var dc = document.cookie;
  var prefix = name + '=';
  var begin = dc.indexOf('; ' + prefix);
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(';', begin);
    if (end === -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
};
