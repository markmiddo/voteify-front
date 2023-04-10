/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from 'components/ui';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import styles from '../styles.scss';

export const SignUp = ({ isAuthorized }) => (
  !isAuthorized ? (
    <Link route="/sign-up" prefetch>
      <Button type="primary" className={styles.signUp}>sign up</Button>
    </Link>
  ) : null
);

SignUp.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};
