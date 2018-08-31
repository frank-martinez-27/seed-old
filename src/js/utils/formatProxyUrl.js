/**
 * Prepends proxy url to relative path redirect urls. Local dev env only
 * @param  {String} path - relative path url
 * @param  {String} host - optional host path, takes priority over proxy
 * @return {String} Returns absolute path url
 */
const formatProxyUrl = (path, host) => {
  const proxySettings = require('../../../package.json').proxy;
  const proxy = host || proxySettings;
  if (proxy && typeof proxy === 'string') {
    return `${proxy}${path}`;
  }
  return path;
};

export default formatProxyUrl;
