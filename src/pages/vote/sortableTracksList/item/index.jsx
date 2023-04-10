import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { SortableElement } from 'react-sortable-hoc';
import Drag from './drag.svg';
import Play from './play.svg';

import cx from 'classnames';
import styles from './styles.scss';

const SortableItem = SortableElement(({ eventTrack, openVideoModal, themeColor }) => (
  <div className={styles.wrapper}>
    <div className={styles.body}>
      <div className={styles.title}>{eventTrack.track.author}</div>
      <div className={styles.subtitle}>{eventTrack.track.title}</div>
    </div>
    <div className={styles.actions}>
      <div className={styles.playWrapper}>
        <Play
          onClick={() => openVideoModal(eventTrack.track.video_id)}
          className={cx(styles.playBtn, `fill-${themeColor}`)}
        />
      </div>
    </div>
  </div>
));

SortableItem.propTypes = {
  eventTrack: PropTypes.object.isRequired,
  openVideoModal: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export default compose(
  SortableElement,
)(SortableItem);
