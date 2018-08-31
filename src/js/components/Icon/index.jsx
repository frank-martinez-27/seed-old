import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

function Icon({ icon, className, paths, ariaHidden, titleMessageId, intl }) {
  const messages = defineMessages({
    title: {
      id: titleMessageId,
    },
  });

  const iconClassName = classNames('icon', icon, className);

  const iconAttributes = {
    className: iconClassName,
  };

  const spans = [];
  for (let i = 0; i < paths; i += 1) {
    spans.push(<span className={`path${i + 1}`} key={`path${i + 1}`} />);
  }

  const ariaHiddenString = ariaHidden.toString();
  if (ariaHiddenString === 'true') {
    iconAttributes['aria-hidden'] = ariaHiddenString;
  }
  if (titleMessageId) {
    iconAttributes.title = intl.formatMessage(messages.title);
  }

  return <span {...iconAttributes}>{spans}</span>;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  paths: PropTypes.number,
  ariaHidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  titleMessageId: PropTypes.string,
  intl: intlShape.isRequired,
};

Icon.defaultProps = {
  className: null,
  paths: 0,
  ariaHidden: true,
  titleMessageId: null,
};

export default injectIntl(Icon);
