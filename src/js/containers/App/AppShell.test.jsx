import React from 'react';
import { shallow } from 'enzyme';
import AppShell from '.';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';
import createComponentWithIntl from '../../utils/testHelpers/createComponentWithIntl';
import { MODALS } from '../../constants';
import { IntlProvider } from 'react-intl';
import { mountWithIntl } from '../../utils/testHelpers/intl-enzyme-test-helper';
jest.mock('react-router-dom');

const APP_SHELL_DEFAULT_PROPS = {
  content: {
    payload: {},
  },
  currentModal: {
    modal: MODALS.NONE,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...APP_SHELL_DEFAULT_PROPS,
});

const APP_SHELL_COMPONENT = (
  <Provider store={store}>
    <IntlProvider locale="EN">
      <AppShell {...APP_SHELL_DEFAULT_PROPS}>
        <p>this content should render</p>
      </AppShell>
    </IntlProvider>
  </Provider>
);

describe('App Shell', () => {
  it('renders correctly with content', () => {
    const wrapper = createComponentWithIntl(APP_SHELL_COMPONENT).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    shallow(APP_SHELL_COMPONENT);
  });

  it('e2e-like test - renders welcome message', () => {
    const wrapper = mountWithIntl(APP_SHELL_COMPONENT);
    expect(wrapper.find('[data-test-main-content]')).toHaveLength(1);
    expect(wrapper.find('[data-test-main-content]').exists()).toEqual(true);
  });
});
