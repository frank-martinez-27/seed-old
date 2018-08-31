import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Modal from '../Modal';
import { hideErrorModal } from './actions';
import Icon from '../../components/Icon';
import logo from '../../../assets/images/logo.svg';

export function ErrorModal({ errors, handleHideModal }) {
  const errorItem = (
    <p className="error__item">{errors.payload.length > 0 ? errors.payload[0].message : null}</p>
  );

  return (
    <Modal closeAction={handleHideModal}>
      <button className="close-button" type="button" onClick={handleHideModal}>
        <span className="show-for-sr">
          <FormattedMessage id="seed.containers.Modal.close.button" />
        </span>
        <Icon className="error__close-icon" icon="icon-close" ariaHidden />
      </button>
      <section className="error error--center-modal">
        <img src={logo} className="error__image" alt="logo" aria-hidden="true" />
        <h4 className="error__heading">
          <FormattedMessage id="seed.containers.Modal.errorHeader" />
        </h4>
        {errorItem}
        <div className="error__close">
          <button
            className="button button--primary error__close-button"
            type="button"
            onClick={handleHideModal}
            data-test-error-modal-close-button
          >
            <FormattedMessage id="seed.containers.Modal.close.buttonText" />
          </button>
        </div>
      </section>
    </Modal>
  );
}

ErrorModal.propTypes = {
  errors: PropTypes.shape({
    payload: PropTypes.array,
  }).isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { errors } = state;
  return {
    errors,
  };
};

const mapDispatchToProps = dispatch => ({
  handleHideModal: () => dispatch(hideErrorModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal);
