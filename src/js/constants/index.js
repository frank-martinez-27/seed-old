export const ACTIONS = Object.freeze({
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  AUTHORIZE_REQUEST: 'AUTHORIZE_REQUEST',
  AUTHORIZE_SUCCESS: 'AUTHORIZE_SUCCESS',
  AUTHORIZE_ERROR: 'AUTHORIZE_ERROR',
  KEEP_ALIVE_REQUEST: 'KEEP_ALIVE_REQUEST',
  KEEP_ALIVE_SUCCESS: 'KEEP_ALIVE_SUCCESS',
  KEEP_ALIVE_ERROR: 'KEEP_ALIVE_ERROR',
  LOG_ERRORS: 'LOG_ERRORS',
  RESET_ERRORS: 'RESET_ERRORS',
  LOAD_APP_CONTENT_REQUEST: 'LOAD_APP_CONTENT_REQUEST',
  LOAD_APP_CONTENT_SUCCESS: 'LOAD_APP_CONTENT_SUCCESS',
  LOAD_APP_CONTENT_ERROR: 'LOAD_APP_CONTENT_ERROR',
});

export const CONTEXT_ROOT = '/';

export const API_ROOTS = Object.freeze({
  MY_APP: '/myApp/api/v1',
  GITHUB_PAGES: 'https://github.com',
});

export const API_PATHS = Object.freeze({
  TEST: '/test',
  KEEP_ALIVE: '/keepAlive',
  AUTH_USER: '/api/1/cookie/validate',
  USER_PROFILE: '/user/profile',
  USERS: '/users',
});

export const ROUTE_PATHS = Object.freeze({
  INDEX: '/',
  PROCESS: '/myApp/:id',
  ERROR: '/error',
});

export const MODALS = Object.freeze({
  NONE: 'NONE',
  ERROR: 'ERROR',
});

export const KEYS = Object.freeze({
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  UP: 38,
});

export const HTTP = Object.freeze({
  STATUS: {
    OK: 200,
    MULTIPLE_CHOICES: 300,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
  REQUEST_METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  HEADER_FIELD: {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization',
    X_SATI: 'X-SATI',
  },
  MIME_TYPE: {
    JSON: 'application/json',
  },
  CREDENTIALS: 'credentials',
  SAME_ORIGIN: 'same-origin',
});

export const LANGUAGES = Object.freeze({
  ENGLISH: 'en',
  ESPANOL: 'es',
});

export const KEEP_ALIVE = Object.freeze({
  EVENTS: ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'],
  DELAY: 10000,
  OPTIONS: { maxWait: 30000 },
  IDLE_TIMEOUT: 2100000, // 35 minutes
});

export const ERRORS = Object.freeze({
  ERROR: 'error',
  DUPLICATE_CYCLE_NAME: 'This cycle name is already in use',
  DUPLICATE_PROCESS_NAME: 'This process name is already in use',
});

export const QUERY_STRING_PARAM = Object.freeze({
  KEY: {
    SERVICE: 'service',
    QUERY: 'query',
  },
  VALUE: {
    FALSE: 'false',
  },
});
