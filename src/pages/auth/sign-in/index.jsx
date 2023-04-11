/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { Input } from 'components/form/index';
import {
  Col, Container, Flex, Row,
} from 'components/grid/index';
import cx from 'classnames';
import { Button, Text, Title } from 'components/ui/index';
import { signInAction } from 'domain/env/index';
import validator from 'libs/validator';
import React, { PureComponent } from 'react';
import { Link } from 'routes';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
// import GoogleIcon from 'static/google.svg';
// import FacebookIcon from 'components/icons/social/facebook.svg';
import DocTitle from 'components/ui/DocTitle';
import styles from '../auth-styles.scss';
// import reminisceOnBoardingImage from '../../../images/rem-website-med-1.jpg';
import Dots from '../../../images/dots.svg';

class SignIn extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  render() {
    const { error, handleSubmit } = this.props;
    return (
      <Container fluid>
        <DocTitle>
          Voteify LOGIN
        </DocTitle>
        <Row>
          <Col lg={7} className="justify-content-end d-none d-lg-flex">
            <div className={styles.promotions}>
              <Title capitalize className={styles.title}>Voteify Voting</Title>
              <Text black className={cx(styles.role, 'mt10')}>Create your account or login to submit your votes.</Text>
              <Dots className={styles.dots} />
              {/* <div className="mt60">
                <img  src={reminisceOnBoardingImage} alt="party-one" className={styles.image} />
              </div> */}
            </div>
          </Col>
          <Col md={12} lg={5} className={styles.formBackground}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Flex justifyContent="between" alignItems="end">
                <Title size="lg">Log in</Title>
                <Link route="/sign-up" prefetch><Title size="md" className={styles.link}>Sign up</Title></Link>
              </Flex>
              {/* <Flex alignItems="center" className="mt20">
                <Text size="md" inline className="mr10">Log in with</Text>
                <a href={`${process.env.API_URL}/api/auth/google_oauth2`}>
                  <GoogleIcon className={cx(styles.icon, styles.googleIcon, 'mr10')} />
                </a>
                <a href={`${process.env.API_URL}/api/auth/facebook`}>
                  <FacebookIcon className={cx(styles.icon, 'mr10')} />
                </a>
              </Flex> */}
              <Field name="email" component={Input} placeholder="email" />
              <Field name="password" component={Input} placeholder="password" type="password" />
              <Link route="/forgot-password" prefetch>
                <Text className={cx(styles.colorGrey, styles.link, 'text-right', 'mt20')} size="sm" capitalize>Forgot password?</Text>
              </Link>
              <Button htmlType="submit" className="mt20">Log In</Button>
              {error && <p className={styles.error}>{error}</p>}
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default compose(
  reduxForm({
    form: 'signIn',
    validate: validator({
      email: [['required'], ['email']],
      password: [['required']],
    }),
    onSubmit: (values, dispatch) => dispatch(signInAction(values)),
  }),
)(SignIn);
