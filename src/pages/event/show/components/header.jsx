import { Title, Text } from 'components/ui';
import React from 'react';
import I from 'immutable';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../styles.scss';

export const Header = ({ event }) => (
  <>
    <Title className={styles.title}>{event.get('name')}</Title>
    <Text className={cx(styles.fs18, 'mt10')} black>{event.get('subtitle')}</Text>
  </>
);

Header.propTypes = {
  event: PropTypes.instanceOf(I.Map),
};
