import redirectToExternalUrl from './index';
import redirectToExternalUrlDev from './redirectToExternalUrl.dev';
import redirectToExternalUrlProd from './redirectToExternalUrl.prod';

describe('Utils', () => {
  afterEach(() => {
    process.env.BABEL_ENV = 'test';
    process.env.NODE_ENV = 'test';
  });

  it('tests redirectToExternalUrl() in development environment', () => {
    // set env var to development
    process.env.BABEL_ENV = 'development';
    process.env.NODE_ENV = 'development';

    window.location.assign = jest.fn();
    const url = '/myApp/login';
    redirectToExternalUrlDev(url);
    expect(window.location.assign).toBeCalledWith(`${url}`);
  });

  it('tests redirectToExternalUrl() in non-development environment', () => {
    jest.resetModules(); // reset env var config
    window.location.assign = jest.fn();
    const url = '/example-test';
    redirectToExternalUrl(url);
    expect(window.location.assign).toBeCalledWith(url);
  });

  it('tests redirectToExternalUrl() in prod environment', () => {
    // set env var to development
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';

    jest.resetModules(); // reset env var config
    window.location.assign = jest.fn();
    const url = '/myApp';
    redirectToExternalUrlProd(url);
    expect(window.location.assign).toBeCalledWith(url);
  });
});
