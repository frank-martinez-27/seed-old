import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Icon from '../../components/Icon';

function Error({ location }) {
  return (
    <section className="error error--center">
      <h4 className="error__heading">
        <FormattedMessage id="seed.containers.Modal.errorHeader" />
      </h4>
      <p className="error__message">
        <Icon icon="icon-warning" /> Error description here...
      </p>
    </section>
  );
}

Error.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

Error.defaultProps = {
  location: {
    state: 'Error',
  },
};

export default Error;
