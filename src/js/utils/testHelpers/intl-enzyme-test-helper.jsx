/**
 * https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#helper-function-1
 *
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { LANGUAGES } from '../../constants';

const content = require('../../constants/content.json');

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider(
  { locale: LANGUAGES.ENGLISH, messages: content.messages.en },
  {}
);
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context } = {}) {
  return shallow(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
  });
}

export function mountWithIntl(node, { context, childContextTypes } = {}) {
  return mount(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
  });
}

/*
 * Repeatedly render a component tree using enzyme.shallow() until
 * finding and rendering TargetComponent.
 *
 * The `componentInstance` parameter is a React component instance.
 * Example: <MyComponent {...props} />
 *
 * The `TargetComponent` parameter is the React class (or function) that
 * you want to retrieve from the component tree.
 */
export function shallowUntilTarget(
  componentInstance,
  TargetComponent,
  { maxTries = 10, shallowOptions, _shallow = shallow } = {}
) {
  if (!componentInstance) {
    throw new Error('componentInstance parameter is required');
  }
  if (!TargetComponent) {
    throw new Error('TargetComponent parameter is required');
  }

  let root = _shallow(componentInstance, shallowOptions);

  if (typeof root.type() === 'string') {
    // If type() is a string then it's a DOM Node.
    // If it were wrapped, it would be a React component.
    throw new Error('Cannot unwrap this component because it is not wrapped');
  }

  for (let tries = 1; tries <= maxTries; tries++) {
    if (root.is(TargetComponent)) {
      // Now that we found the target component, render it.
      return root.shallow(shallowOptions);
    }
    // Unwrap the next component in the hierarchy.
    root = root.dive();
  }

  throw new Error(
    `Could not find ${TargetComponent} in rendered instance: ${componentInstance}; gave up after ${maxTries} tries`
  );
}
