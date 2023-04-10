/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { signUpAction } from 'domain/env';
import validator from 'libs/validator';

import { Flex } from 'components/grid';
import { Title } from 'components/ui/Title';
import { Link } from 'routes';
import { Text } from 'components/ui/Text';
import { Field, reduxForm } from 'redux-form/lib/immutable';
import { Input } from 'components/form/input';
import { Checkbox } from 'components/form/checkbox';
import { Button } from 'components/ui/Button';

import cx from 'classnames';
import styles from '../styles.scss';

import GoogleIcon from 'static/google.svg';
import FacebookIcon from 'components/icons/social/facebook.svg';

class ModalAuthSignUp extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    onChangeFormType: PropTypes.func,
  };

  render() {
    const { handleSubmit, onChangeFormType, error } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} className={styles.formAuthModal}>
          <Flex justifyContent="between" alignItems="end">
            <Title size="lg">Sign up</Title>
            <a onClick={() => onChangeFormType('signIn')}>
              <Title size="md" className={styles.link}>Sign in</Title>
            </a>
          </Flex>
          {/*<Flex alignItems="center" className="mt20">*/}
          {/*  <Text size="md" inline className="mr10">Sign Up with</Text>*/}
          {/*  <a href={`${process.env.API_URL}/api/auth/google_oauth2`}>*/}
          {/*    <GoogleIcon className={cx(styles.icon, styles.googleIcon, 'mr10')} />*/}
          {/*  </a>*/}
          {/*  <a href={`${process.env.API_URL}/api/auth/facebook`}>*/}
          {/*    <FacebookIcon className={cx(styles.icon, 'mr10')} />*/}
          {/*  </a>*/}
          {/*</Flex>*/}
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
      </div>
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
)(ModalAuthSignUp);
