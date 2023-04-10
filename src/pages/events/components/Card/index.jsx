
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import I from 'immutable';
import Link from 'next/link';

import { Text } from 'components/ui/Text';
import Dots from '../../../../images/dots.svg';

import styles from '../styles.scss';

const EventItem = ({ event }) => (
  <div className={`${styles.cardWrapper}`}>
    <div className={styles.cardImageWrapper}>
      <Link href={`/event/${event.get('id')}`}>
        <img
          className={styles.cardImage}
          src={`${process.env.IMAGE_PREFIX}${event.getIn(['landing_image', 'medium', 'url'])}`}
          alt="landing_image"
        />
      </Link>
      <Dots className={cx(styles.cardDots, `fill-${event.get('color')}`)} />
    </div>
    <section className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <Link href={`/event/${event.get('id')}`}>
          <h2 className={styles.cardTitle}>
            {event.get('name')}
          </h2>
        </Link>
        <Text size="md" black>
          {moment(event.get('end_date')).format('DD.MM.YYYY')}
          &nbsp;
          {event.get('place')}
        </Text>
      </div>
      <Text size="md" black>
        About event
      </Text>
      <div className={styles.aboutWrap}>
        <Text size="md">
          {event.get('subtitle')}
        </Text>
      </div>

    </section>
  </div>
);

EventItem.propTypes = {
  event: PropTypes.instanceOf(I.Map),
};

export default EventItem;
