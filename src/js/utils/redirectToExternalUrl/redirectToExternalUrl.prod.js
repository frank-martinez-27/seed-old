/**
 * Redirect window to load document at url specified
 * @param  {String} url - relative path url
 */
const redirectToExternalUrl = url => window.location.assign(url);

export default redirectToExternalUrl;
