import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalConductor from '../Modal/ModalConductor';
import { FetchedDataShape } from '../../constants/propShapes';
import { ToastContainer } from 'react-toastify';
import NavigationBar from '../../components/NavigationBar';

export function AppShell({ children, content }) {
  return (
    <div className="app" style={{ flexGrow: 1 }}>
      <NavigationBar />
      <ToastContainer />
      <main id="main-content" className="app__main-content" data-test-main-content>
        {children}
      </main>
      <ModalConductor />
    </div>
  );
}

AppShell.propTypes = {
  children: PropTypes.element.isRequired,
  content: PropTypes.shape(FetchedDataShape).isRequired,
};

const mapStateToProps = state => {
  const { content } = state;
  return {
    content,
  };
};

export default connect(mapStateToProps)(AppShell);
