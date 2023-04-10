import { Text } from 'components/ui/Text';
import React from 'react';
import I from 'immutable';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { formatDate } from 'react-day-picker/moment';
import moment from 'moment';
import styles from '../styles.scss';

export const Date = ({ event }) => {
  const start_date = event.get('start_date');
  const end_date = event.get('end_date');
  const isSameDate = moment(start_date).diff(end_date, 'day') <= 0;
  return <>
    <div className={styles.dateItem}>
      <Text size="sm" capitalize>Date</Text>
      <div>
        {
          !isSameDate &&
          <>
            <span className="text-nowrap">{formatDate(start_date, 'll')}</span>
            <span className="pl5 pr5">-</span>
          </>
        }
        <span className="text-nowrap">{formatDate(end_date, 'll')}</span>
      </div>
    </div>

    <div className={cx(styles.dateItem, 'mt20')}>
      <Text size="sm" capitalize>Location</Text>
      <Text black>{event.get('place')}</Text>
    </div>
  </>
};

Date.propTypes = {
  event: PropTypes.instanceOf(I.Map),
};
