import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { hideModal } from './actions';
import { KEYS } from '../../constants';
import Icon from '../../components/Icon';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleCloseAction = this.handleCloseAction.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  componentDidMount() {
    // this needs to be a listener on the window
    // rather than a listener on the div, because onKeyUp won't fire
    // unless an input is focused
    window.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyUp(e) {
    if (e.keyCode === KEYS.ESC) {
      this.handleCloseAction();
    }
  }

  handleCloseAction() {
    const { handleHideModal, closeAction } = this.props;
    if (closeAction) {
      closeAction();
    } else {
      handleHideModal();
    }
  }

  handleBackgroundClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.handleCloseAction();
  }

  render() {
    const { title, small, children } = this.props;
    const modalClass = classNames({
      reveal: true,
      'reveal--small': small,
    });

    return (
      <div
        className="reveal-overlay"
        data-test-modal-wrapper
        onClick={this.handleBackgroundClick}
        role="button"
        tabIndex={0}
      >
        <div className={modalClass}>
          {title && (
            <header className="modal-header">
              <h1 className="modal-header__heading">{title}</h1>
              <button data-test-close-button type="button" onClick={this.handleCloseAction}>
                <span className="show-for-sr">
                  <FormattedMessage id="seed.containers.Modal.close.button" />
                </span>
                <Icon icon="icon-close" />
              </button>
            </header>
          )}
          <div className="modal__body">{children}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
  title: PropTypes.string,
  small: PropTypes.bool,
  handleHideModal: PropTypes.func.isRequired,
  closeAction: PropTypes.func,
};

Modal.defaultProps = {
  instructions: '',
  title: '',
  small: false,
  closeAction: null,
};

const mapDispatchToProps = dispatch => ({
  handleHideModal: () => dispatch(hideModal()),
});

export default connect(
  null,
  mapDispatchToProps
)(Modal);
