import { Text } from 'components/ui/Text';
import React from 'react';
import I from 'immutable';
import PropTypes from 'prop-types';
import styles from '../styles.scss';

export const Description = ({ event, ...rest }) => (
  <div {...rest}>
    <Text black className={styles.fs18}>Event Details</Text>
    <Text className="mt10" size="md">{event.get('description')}</Text>
  </div>
);

Description.propTypes = {
  event: PropTypes.instanceOf(I.Map),
};
