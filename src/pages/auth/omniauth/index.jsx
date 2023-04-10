import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { omniauthAction, omniauthUpdateAction } from 'domain/env/actions';
import { envRoleSelector } from 'domain/env/selectors';
import { formValueSelector } from 'redux-form/immutable';

import Form from './form';
import { Col, Container, Row } from 'components/grid';
import { Loader } from 'components/ui';
import DocTitle from '../../../components/ui/DocTitle';
import { Title } from '../../../components/ui/Title';
import Dots from '../../../images/dots.svg';

import image1 from '../../../images/Rectangle1-up.png';
import image2 from '../../../images/Rectangle2.png';
import image3 from '../../../images/Rectangle3-up.png';
import image4 from '../../../images/Rectangle4.png';

import cx from 'classnames';
import styles from '../auth-styles.scss';

class OmniauthPage extends Component {
  static async getInitialProps({ ctx }) {
    return {
      query: ctx.query,
    };
  }

  constructor(props) {
    super(props);

    const { query, omniauth, } = props;
    this.state = {
      isBusy: true,
    };

    new Promise((resolve, reject) => {
      omniauth({ query, resolve, reject });
    }).finally(() => this.setState({ isBusy: false }));
  }

  onUpdateUser = (resource) => {
    const { omniauthUpdate, query } = this.props;
    omniauthUpdate({ data: { resource }, id: query.id });
  };

  render() {
    const {
      type, role, iAgree,
    } = this.props;

    const { isBusy } = this.state;


    return (
      <div>
        {isBusy && (<Loader />)}
        {!isBusy && !role && (
          <Container fluid>
            <DocTitle>Sign up</DocTitle>
            <Row>
              <Col lg={7} className="justify-content-end d-none d-lg-flex">
                <div className={styles.promotions}>
                  <Title capitalize className={styles.title}>Create A Voteify Account</Title>

                  <Dots className={styles.dots} />
                  <div className="mt60">
                    <img src={image1} alt="party-one" className={styles.image} />
                    <img src={image2} alt="party-two" className={styles.image} />
                    <img src={image3} alt="party-three" className={styles.image} />
                    <img src={image4} alt="party-four" className={styles.image} />
                  </div>
                </div>
              </Col>
              <Col md={12} lg={5} className={cx(styles.formBackground)}>
                <Form onSubmit={this.onUpdateUser} iAgree={iAgree} type={type} />
              </Col>
            </Row>
          </Container>
        )}
      </div>

    );
  }
}

OmniauthPage.propTypes = {
  omniauth: PropTypes.func,
  omniauthUpdate: PropTypes.func,
  role: PropTypes.string,
  type: PropTypes.string,
  iAgree: PropTypes.bool,
  query: PropTypes.object,
};

const selector = formValueSelector('omniauthForm');

const mapStateToProps = state => ({
  type: selector(state, 'type'),
  iAgree: selector(state, 'rights'),
  role: envRoleSelector(state),
});

const mapDispatchToProps = {
  omniauth: omniauthAction,
  omniauthUpdate: omniauthUpdateAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(OmniauthPage);
