import {
  Col, Container, Flex, Row,
} from 'components/grid/index';
import SuccessMessage from 'components/ui/SuccessMessage';
import injectReducer from 'libs/injects/injectReducer';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from 'pages/auth/auth-styles.scss';
import reducer, { pageMessageSelector, pageStatusSelector } from './reducer';
import DocTitle from 'components/ui/DocTitle';
import Form from './form';


const renderPageBody = (pageStatus, successMessage) => {
  switch (pageStatus) {
    case 'form':
      return <Form />;
    case 'success':
      return <SuccessMessage title={successMessage} link={{ to: '/sign-in', title: 'sign in' }} />;
    default:
      return <Form />;
  }
};

const ResetPassword = ({ pageStatus, successMessage }) => (
  <Container fluid>
    <DocTitle>
      Password reset
    </DocTitle>
    <Row>
      <Col md={12}>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" className={styles.wrapper}>
          {renderPageBody(pageStatus, successMessage)}
        </Flex>
      </Col>
    </Row>
  </Container>
);

ResetPassword.propTypes = {
  pageStatus: PropTypes.oneOf(['form', 'success']),
  successMessage: PropTypes.string,
};

ResetPassword.defaultProps = {
  pageStatus: 'form',
};

export default compose(
  injectReducer({ key: 'reset', reducer }),
  connect(state => ({
    pageStatus: pageStatusSelector(state),
    successMessage: pageMessageSelector(state),
  })),
)(ResetPassword);
