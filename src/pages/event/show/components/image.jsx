import React from 'react';
import I from 'immutable';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../styles.scss';
import Circle from './circle.svg';
import Dots from './dots.svg';

export const Image = ({ event }) => (
  <>
    <Circle className={cx(styles.circle, `fill-${event.get('color')}`)} />
    <img
      src={`${process.env.IMAGE_PREFIX}${event.getIn(['landing_image', 'url'])}`}
      alt="party"
      className={styles.image}
    />
    <Dots className={cx(styles.dots, `fill-${event.get('color')}`)} />
  </>
);

Image.propTypes = {
  event: PropTypes.instanceOf(I.Map),
};
