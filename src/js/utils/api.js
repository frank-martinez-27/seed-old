import { HTTP } from '../constants';
import { cookieNameExists } from './index';

/**
 * Checks if network request returns ok, throws error if not
 * @param  {Response} response - Response from network request
 * @return {object|undefined} Returns response or throws error
 */
function checkStatus(response) {
  if (response.status >= HTTP.STATUS.OK && response.status < HTTP.STATUS.MULTIPLE_CHOICES) {
    return response;
  }

  const error = new Error(response);
  error.response = response;
  if (error.response.status === 401) {
    if (process.env.NODE_ENV === 'development') {
      if (!cookieNameExists('att')) {
        document.cookie = 'att=regularUser; path=/;';
        document.cookie = 'mock-user-type=USER|true; path=/;';
      }
    }
  }
  throw error;
}

/**
 * Parses JSON returned by network request
 * @param  {Response} response - Response from network request
 * @return {object} Parsed JSON from request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Requests API endpoint (URL), returns promise
 * @param {string} apiRoot - root of URL to request
 * @param {string} path - path of URL to request
 * @param {object} options - custom settings applied to request
 * @return {Promise} a Promise that resolves to a Response object
 */
export default function callApi(apiRoot, path, options) {
  const endpoint = apiRoot + path;
  // send HttpOnly cookies from same origin with each request
  const optionsWithCredentials = {
    ...options,
    [HTTP.CREDENTIALS]: HTTP.SAME_ORIGIN,
  };

  return fetch(endpoint, optionsWithCredentials)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => Promise.reject(error));
}
