import React from 'react';
import { shallow } from 'enzyme';
import ReactMain from './reactMainPage';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import createComponentWithIntl from '../../utils/testHelpers/createComponentWithIntl';
import { shallowWithIntl } from '../../utils/testHelpers/intl-enzyme-test-helper';
import { MemoryRouter } from 'react-router-dom';

const MainPageComponent = (
  <IntlProvider locale="EN">
    <ReactMain />
  </IntlProvider>
);
describe('Main Page', () => {
  it('renders correctly', () => {
    const reactMainPage = createComponentWithIntl(
      <MemoryRouter>
        <ReactMain />
      </MemoryRouter>
    ).toJSON();
    expect(reactMainPage).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    shallow(<ReactMain />);
  });

  it('renders welcome message', () => {
    const wrapper = shallowWithIntl(<ReactMain />);
    const welcome = (
      <h1 className="App-title" data-testid="title">
        Welcome to React
      </h1>
    );
    expect(wrapper.find('[data-testid="title"]')).toBeDefined();
    expect(wrapper.contains(welcome)).toEqual(true);
    expect(wrapper).toContainReact(welcome);
  });

  it('e2e-like test - renders welcome message', () => {
    const { getByText } = render(MainPageComponent);
    expect(getByText('Welcome to React')).toBeInTheDOM();
    expect(getByText('Welcome to React')).toBeInTheDocument();
    expect(document.querySelector('[data-testid="header"]')).toContainElement(
      document.querySelector('[data-testid="title"]')
    );
  });
});
