import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import SortableItem from './Item';

const SortableList = SortableContainer(({ items, toggleTopSelected }) => (
  <div className="col mb20">
    {items.map((value, index) => (
      <SortableItem
        key={value.id}
        index={index}
        value={value}
        toggleTopSelected={toggleTopSelected}
      />
    ))}
  </div>
));

SortableList.propTypes = {
  toggleTopSelected: PropTypes.func.isRequired,
};

export default SortableList;
