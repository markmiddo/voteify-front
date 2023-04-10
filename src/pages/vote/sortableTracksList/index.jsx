import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Modal, YouTube,
} from 'components/ui';
import SortableList from './list';

import styles from './styles.scss';
import { arrayMove } from 'react-sortable-hoc';

class SortableTracksList extends Component {
  state = {
    items: [],
    videoIsOpen: false,
    videoID: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { items } = props;

    if (state.items.length === items.length) {
      return state;
    }

    return {
      items,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { onChangeOrder } = this.props;
    const { items } = this.state;
    const orderedList = arrayMove(items, oldIndex, newIndex);

    this.setState({
      items: orderedList,
    });

    onChangeOrder(orderedList);
  };

  openVideoModal = (videoID) => {
    this.setState({ videoIsOpen: true, videoID });
  };

  closeVideoModal = () => this.setState({ videoIsOpen: false, videoID: null });

  render() {
    const { topCount, themeColor } = this.props;
    const { items, videoIsOpen, videoID } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.colLeft}>
          {items.map((item, index) => (
            <div className={styles.topIndex} key={`top-index-${index}`}>
              {index < topCount ? index + 1 : ''}
            </div>
          ))}
        </div>
        <div id='sortable-list-mobile-container' className={styles.colMiddle}>
          <SortableList
            items={items}
            themeColor={themeColor}
            helperClass={styles.isActiveDrag}
            onSortEnd={this.onSortEnd}
            getContainer={() => document.getElementById('sortable-list-mobile-container')}
            openVideoModal={this.openVideoModal}
          />
        </div>

        {videoIsOpen && (
          <Modal
            cancel={this.closeVideoModal}
            containerClassName={styles.modalOverlay}
            className={styles.modalBody}
            close
          >
            <YouTube video={videoID} autoplay="0" rel="0" modest="1" />
          </Modal>
        )}
      </div>
    );
  }
}

SortableTracksList.propTypes = {
  items: PropTypes.array.isRequired,
  topCount: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
};

export default (SortableTracksList);
