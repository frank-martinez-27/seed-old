if (process.env.NODE_ENV === 'development') {
  module.exports = require('./loadAppContent.dev'); // eslint-disable-line global-require
} else {
  module.exports = require('./loadAppContent.prod'); // eslint-disable-line global-require
}
