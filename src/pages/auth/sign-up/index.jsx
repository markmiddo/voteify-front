/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkbox, Input } from 'components/form/index';
import {
  Col, Container, Flex, Row,
} from 'components/grid/index';
import { signUpAction } from 'domain/env/index';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Text, Title } from 'components/ui/index';
import React, { Fragment, PureComponent } from 'react';
import { Link } from 'routes';
import { compose } from 'redux';
import validator from 'libs/validator';
import { Field, reduxForm } from 'redux-form/immutable';
// import GoogleIcon from 'static/google.svg';
// import FacebookIcon from 'components/icons/social/facebook.svg';
import DocTitle from 'components/ui/DocTitle';
import styles from '../auth-styles.scss';
// import reminisceOnBoardingImage from '../../../images/reminisce-home.jpg';
import Dots from '../../../images/dots.svg';
import { fromJS } from 'immutable';

class SignUp extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <Container fluid>
        <DocTitle>
          Sign up
        </DocTitle>
        <Row>
          <Col lg={7} className="justify-content-end d-none d-lg-flex">
            <div className={styles.promotions}>
              <Title capitalize className={styles.title}>Create A Voteify Account</Title>
              <Dots className={styles.dots} />
              {/* <div className="mt60">
                <img src={reminisceOnBoardingImage} alt="party-one" className={styles.image} />
              </div> */}
            </div>
          </Col>
          <Col md={12} lg={5} className={cx(styles.formBackground)}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Flex justifyContent="between" alignItems="end">
                <Title size="lg">Sign up</Title>
                <Link route="/sign-in" prefetch><Title size="md" className={styles.link}>Log in</Title></Link>
              </Flex>
              {/* <Flex alignItems="center" className="mt20">
                <Text size="md" inline className="mr10">Sign Up with</Text>
                <a href={`${process.env.API_URL}/api/auth/google_oauth2`}>
                  <GoogleIcon className={cx(styles.icon, styles.googleIcon, 'mr10')} />
                </a>
                <a href={`${process.env.API_URL}/api/auth/facebook`}>
                  <FacebookIcon className={cx(styles.icon, 'mr10')} />
                </a>
              </Flex> */}
              <Field name="name" component={Input} placeholder="Name" />
              <Field name="email" component={Input} placeholder="Email" />
              <Field name="password" component={Input} placeholder="Password" type="password" />
              <Field name="password_confirmation" component={Input} placeholder="Re-enter Password" type="password" />
              <Field
                name="rights"
                type="checkbox"
                component={Checkbox}
                className="mt15"
                label={(
                  <Fragment>
                    I accept
                    {' '}
                    <Link route="/terms-and-conditions" prefetch>
                      <a href="https://reminisce.dj/website-terms-conditions/" target="_blank" rel="noopener noreferrer">
                        Terms and Conditions
                      </a>
                    </Link>
                  </Fragment>
                )}
              />
              <Button htmlType="submit" className="mt20">Sign Up</Button>
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
    form: 'signUpForm',
    initialValues: fromJS({
      type: 'Patron',
      rights: true,
      confirm_success_url: `${process.env.FRONTEND_URL}/sign-in`,
    }),
    validate: validator({
      name: [['required']],
      email: [['required'], ['email']],
      password: [['required'], ['minLength:6', 'Must be longer then 6']],
      password_confirmation: [['required'], ['equal:password']],
      rights: [['required', 'Must be checked']],
    }),
    onSubmit: (values, dispatch) => dispatch(signUpAction(values)),
  }),
)(SignUp);
