import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import pullAllBy from 'lodash/pullAllBy';
import intersectionBy from 'lodash/intersectionBy';
import { compose } from 'redux';
import SortableList from './List';
import styles from './styles.scss';

class SortableComponent extends Component {
  state = {
    items: [],
  }

  static getDerivedStateFromProps(props, state) {
    const items = props.items.toJS();
    if (state.items.length === items.length) return state;
    const intersect = intersectionBy(items, state.items, 'id');
    pullAllBy(items, state.items, 'id');
    return {
      items: [...intersect, ...items],
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state;
    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  };

  render() {
    const { items } = this.state;
    const { toggleTopSelected } = this.props;
    return (
      <SortableList
        items={items}
        onSortEnd={this.onSortEnd}
        helperClass={styles.helper}
        toggleTopSelected={toggleTopSelected}
        useDragHandle
      />
    );
  }
}

SortableComponent.propTypes = {
  toggleTopSelected: PropTypes.func.isRequired,
};

export default compose()(SortableComponent);
