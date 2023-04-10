import { Flex, Row } from 'components/grid';
import { Text } from 'components/ui/Text';
import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { compose } from 'redux';
import styles from './styles.scss';
import Drag from './drag.svg';
import Delete from './delete-icon.svg';

const DragHandle = SortableHandle(() => <Drag className={styles.drag} />);

const SortableItem = ({ value, toggleTopSelected }) => (
  <Row className={styles.item}>
    <div className="col">
      <div className={styles.itemBody}>
        <DragHandle />
        <Text size="md" black className="text-truncate">{value.track.title}</Text>
        <Text size="md" className=" mt5 text-truncate">{value.track.author}</Text>
        <Flex alignItems="center" className={styles.delete} onClick={toggleTopSelected(value.id)}>
          <Delete />
          <Text size="md" black className="ml10 d-none d-sm-block">Delete</Text>
        </Flex>
      </div>
    </div>
  </Row>
);

SortableItem.propTypes = {
  toggleTopSelected: PropTypes.func.isRequired,
  value: PropTypes.shape({
    id: PropTypes.number,
    track: PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
    }),
  }),
};

export default compose(
  SortableElement,
)(SortableItem);
