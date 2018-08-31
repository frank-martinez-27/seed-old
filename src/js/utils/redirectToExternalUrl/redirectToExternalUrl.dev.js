import formatProxyUrl from '../formatProxyUrl';

/**
 * Redirect window to load document at url specified
 * Format absolute path if needed
 * @param  {String} url - relative path url
 */
const redirectToExternalUrl = url => window.location.assign(formatProxyUrl(url));

export default redirectToExternalUrl;
