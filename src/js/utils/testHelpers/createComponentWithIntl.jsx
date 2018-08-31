// https://github.com/yahoo/react-intl/blob/master/examples/jest-snapshot-testing/src/utils/createComponentWithIntl.js

import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import { IntlProvider } from 'react-intl';
import content from '../../constants/content.json';
import { getMessagesForLanguage } from '../../containers/Localization';
import { LANGUAGES } from '../../constants';

const createComponentWithIntl = (children, props = { locale: LANGUAGES.ENGLISH, messages: {} }) => {
  const translation = getMessagesForLanguage(props.locale, content.messages);
  return renderer.create(
    <IntlProvider {...props} messages={translation}>
      {children}
    </IntlProvider>
  );
};

export default createComponentWithIntl;
