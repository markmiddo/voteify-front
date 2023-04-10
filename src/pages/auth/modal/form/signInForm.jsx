/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { signInAction } from 'domain/env/index';
import { Field, reduxForm } from 'redux-form/immutable';
import validator from 'libs/validator';

import { Link } from 'routes';
import {
  Flex,
} from 'components/grid/index';
import { Input } from 'components/form/index';
import { Button, Text, Title } from 'components/ui/index';

import cx from 'classnames';
import styles from '../styles.scss';

import GoogleIcon from 'static/google.svg';
import FacebookIcon from 'components/icons/social/facebook.svg';

class ModalAuthSignIn extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    onChangeFormType: PropTypes.func,
  };

  render() {
    const { error, handleSubmit, onChangeFormType } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} className={styles.formAuthModal}>
          <Flex justifyContent="between" alignItems="end">
            <Title size="lg">Log in</Title>
            <a onClick={() => onChangeFormType('signUp')}>
              <Title size="md" className={styles.link}>Sign up</Title>
            </a>
          </Flex>
          {/*<Flex alignItems="center" className="mt20">*/}
          {/*  <Text size="md" inline className="mr10">Log in with</Text>*/}
          {/*  <a href={`${process.env.API_URL}/api/auth/google_oauth2`}>*/}
          {/*    <GoogleIcon className={cx(styles.icon, styles.googleIcon, 'mr10')} />*/}
          {/*  </a>*/}
          {/*  <a href={`${process.env.API_URL}/api/auth/facebook`}>*/}
          {/*    <FacebookIcon className={cx(styles.icon, 'mr10')} />*/}
          {/*  </a>*/}
          {/*</Flex>*/}
          <Field name="email" component={Input} placeholder="email" />
          <Field name="password" component={Input} placeholder="password" type="password" />

          <Button htmlType="submit" className="mt20">Log In</Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
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
)(ModalAuthSignIn);
