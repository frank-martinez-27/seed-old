import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';
import ErrorModal from '../ErrorPage/ErrorModal';

const ModalConductor = props => {
  switch (props.currentModal.modal) {
    case 'ERROR':
      return <ErrorModal {...props} />;

    default:
      return null;
  }
};

ModalConductor.propTypes = {
  currentModal: PropTypes.shape({
    modal: PropTypes.string,
    processId: PropTypes.string,
    processChangeVersion: PropTypes.number,
    selectedStepId: PropTypes.string,
  }).isRequired,
};

ModalConductor.defaultProps = {
  currentModal: PropTypes.shape({
    modal: null,
    processId: null,
    processChangeVersion: null,
    selectedStepId: null,
  }).isRequired,
};

export default connect(
  state => state,
  () => actions
)(ModalConductor);
