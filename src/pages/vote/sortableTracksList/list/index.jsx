import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from '../item';

const SortableList = SortableContainer(({ items, openVideoModal, themeColor }) => (
  items.map((eventTrack, index) => (
    <SortableItem
      key={`item-${eventTrack.id}`}
      index={index}
      eventTrack={eventTrack}
      themeColor={themeColor}
      openVideoModal={openVideoModal}
    />
  ))
));

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  openVideoModal: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export default (SortableList);
