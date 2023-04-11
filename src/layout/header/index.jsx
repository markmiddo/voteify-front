import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { envInstanceSelector, envIsAuthorized, logOutAction } from 'domain/env';
import { checkIfInAuthRoutes } from 'services/routes';
import { withRouter } from 'next/router';
import I from 'immutable';

import { Col, Container, Row } from 'components/grid';
import { AuthLinks, Logged } from './right-components';
import Logo from 'static/voteify-logo-short.svg';


import cx from 'classnames';
import styles from './styles.scss';

class Header extends Component {
  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    user: PropTypes.instanceOf(I.Map).isRequired,
    logOut: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
  }

  renderRightComponent = () => {
    const {
      router, isAuthorized, user, logOut,
    } = this.props;
    if (checkIfInAuthRoutes(router.pathname)) return null;
    if (isAuthorized) return <Logged user={user} logOut={logOut} />;
    return <AuthLinks />;
  }

  render() {
    return (
      <div className={cx(styles.root, 'layout-header')}>
        <Container>
          <Row className={cx(styles.row, 'align-items-center', 'justify-content-between')}>
            <Col auto>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Logo  style={{ width: '65px', height: '60px' }} />
              </a>
            </Col>
            {this.renderRightComponent()}
          </Row>
        </Container>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(createStructuredSelector({
    user: envInstanceSelector,
    isAuthorized: envIsAuthorized,
  }), { logOut: logOutAction }),
)(Header);
