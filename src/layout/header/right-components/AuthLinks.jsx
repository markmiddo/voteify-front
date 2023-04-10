/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col } from 'components/grid';
import { Text } from 'components/ui/Text';
import React from 'react';
import { Link } from 'routes';
import styles from './styles.scss';

export const AuthLinks = () => (
  <Col auto>
    <Link prefetch route="/sign-up"><Text black inline className={styles.link}>Sign Up</Text></Link>
    <Text className="ml5 mr5" black inline>/</Text>
    <Link prefetch route="/sign-in"><Text black inline className={styles.link}>Log in</Text></Link>
  </Col>
);
