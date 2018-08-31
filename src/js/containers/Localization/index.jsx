import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import { LANGUAGES } from '../../constants';
import loadAppContent from '../../utils/loadAppContent';
import { FetchedDataShape } from '../../constants/propShapes';

addLocaleData([...en]);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
function getLanguageForUser() {
  // language that user has set in their browser
  return (
    (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
  );
}

// parse supported languages from json
function getSupportedLanguages(localeData) {
  return Object.keys(localeData);
}

function fallbackToEnglish(language, localeData) {
  return !getSupportedLanguages(localeData).includes(language) ? LANGUAGES.ENGLISH : language;
}

// Split locales with a region code
function getLanguageWithoutRegionCode(language) {
  return language.toLowerCase().split(/[_-]+/)[0];
}

// Try full locale, try locale without region code, fallback to 'en'
export function getMessagesForLanguage(language, messages) {
  return messages[language] || messages[getLanguageWithoutRegionCode(language)] || messages.en;
}

export class Localization extends Component {
  // comment out external content fetch until we find proper method to publish static files
  //
  // componentDidMount() {
  //   const { handleLoadAppContent } = this.props;
  //   handleLoadAppContent();
  // }

  render() {
    const { children, content } = this.props;
    const localeData = content.payload.messages;

    const language = fallbackToEnglish(getLanguageForUser(), localeData);
    const messages = getMessagesForLanguage(language, localeData);
    return (
      <IntlProvider locale={language} messages={messages}>
        {children}
      </IntlProvider>
    );
  }
}

Localization.propTypes = {
  children: PropTypes.element.isRequired,
  content: PropTypes.shape(FetchedDataShape).isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleLoadAppContent: () => dispatch(loadAppContent()),
});

const mapStateToProps = state => {
  const { content } = state;
  return {
    content,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localization);
