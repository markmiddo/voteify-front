import {
  Col, Container, Flex, Row,
} from 'components/grid/index';
import SuccessMessage from 'components/ui/SuccessMessage';
import injectReducer from 'libs/injects/injectReducer';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from 'pages/auth/auth-styles.scss';
import DocTitle from 'components/ui/DocTitle';
import Form from './form';
import reducer, { pageStatusSelector } from './reducer';

const renderPageBody = (pageStatus) => {
  switch (pageStatus) {
    case 'form':
      return <Form />;
    case 'success':
      return <SuccessMessage title="Please check your email for a reset link" link={{ to: '/sign-in', title: 'sign in' }} />;
    default:
      return <Form />;
  }
};

const ForgotPassword = ({ pageStatus }) => (
  <Container fluid>
    <DocTitle>
      Password recovery
    </DocTitle>
    <Row>
      <Col md={12}>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" className={styles.wrapper}>
          {renderPageBody(pageStatus)}
        </Flex>
      </Col>
    </Row>
  </Container>
);

ForgotPassword.propTypes = {
  pageStatus: PropTypes.oneOf(['form', 'success']),
};

ForgotPassword.defaultProps = {
  pageStatus: 'form',
};

export default compose(
  injectReducer({ key: 'forgot', reducer }),
  connect(state => ({
    pageStatus: pageStatusSelector(state),
  })),
)(ForgotPassword);
