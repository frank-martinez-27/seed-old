if (process.env.NODE_ENV === 'development') {
  module.exports = require('./redirectToExternalUrl.dev'); // eslint-disable-line global-require
} else {
  module.exports = require('./redirectToExternalUrl.prod'); // eslint-disable-line global-require
}
