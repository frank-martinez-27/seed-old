import configureMockStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import { API_ROOTS, API_PATHS } from '../../constants';
import content from '../../constants/content.json';
import loadAppContent from './index';
import loadAppContentDev from './loadAppContent.dev';
import loadAppContentProd from './loadAppContent.prod';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loadAppContent()', () => {
  afterEach(() => {
    process.env.BABEL_ENV = 'test';
    process.env.NODE_ENV = 'test';
  });

  it('tests in development environment', () => {
    const store = mockStore();
    store.dispatch(loadAppContentDev());
    expect(store.getActions()).toEqual([]);
  });

  it('tests in non-development environment', () => {
    const store = mockStore();
    store.dispatch(loadAppContent());
    expect(store.getActions()).toEqual([{ type: 'LOAD_APP_CONTENT_REQUEST' }]);
  });

  it('tests in prod environment', () => {
    // set env var to production
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
    jest.resetModules(); // reset env var config

    // mock external content fetch
    fetchMock.getOnce(`${API_ROOTS.GITHUB_PAGES}${API_PATHS.CONTENT}`, {
      body: content,
    });

    const store = mockStore();
    store.dispatch(loadAppContentProd());
    expect(store.getActions()).toEqual([{ type: 'LOAD_APP_CONTENT_REQUEST' }]);
  });
});
