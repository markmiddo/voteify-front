/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import cx from 'classnames';
import { Col, Row } from 'components/grid/index';
import {
  Text, Tooltip, Modal, YouTube,
} from 'components/ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from 'components/icons/star.svg';
import I from 'immutable';
import Play from './play.svg';
import Checkbox from './checkbox/index';
import styles from './styles.scss';

class SongList extends Component {
  state = {
    videoIsOpen: false,
    videoId: null,
  }

  openVideoModal = videoId => () => this.setState({ videoIsOpen: true, videoId });

  closeVideoModal = () => this.setState({ videoIsOpen: false, videoId: null });

  render() {
    const {
      items, toggleSelected, selected, color,
    } = this.props;

    const { videoIsOpen, videoId } = this.state;
    if (!items.size) return <Text size="md">Song not found. Try later</Text>;
    return (
      <>
        {items.map((item) => {
          const id = item.get('id');
          return (
            <Row
              key={id}
              className={cx(styles.item, { [styles.active]: selected.includes(id) })}
            >
              <Col auto>
                <Play
                  className={cx(styles.link, `fill-${color}`)}
                  onClick={this.openVideoModal(item.getIn(['track', 'video_id']))}
                />
              </Col>
              <div className="col">
                <div className={styles.songBody}>
                  <div
                    className={cx(styles.overlay, 'd-sm-none')}
                    onClick={toggleSelected(id)}
                  />
                  <Row>
                    <div className="col">
                      <Text size="md" black>{item.getIn(['track', 'title'])}</Text>
                      <Text size="md" className="mt5">{item.getIn(['track', 'author'])}</Text>
                    </div>
                    <Col auto className="d-flex">
                      {item.get('star') && (
                        <Tooltip
                          block
                          className={cx('mr20', 'd-none d-sm-block')}
                          target={<Star className={`fill-${color}`} />}
                          body={<Tooltip.Dark text="Added by you" position="bottom" className={styles.startTooltip} />}
                        />
                      )}
                      <Checkbox
                        checked={selected.includes(id)}
                        type="checkbox"
                        onChange={toggleSelected(id)}
                        containerClassName="d-none d-sm-block"
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Row>
          );
        })}
        {videoIsOpen && (
          <Modal
            cancel={this.closeVideoModal}
            containerClassName={styles.modalOverlay}
            className={styles.modalBody}
            close
          >
            <YouTube video={videoId} autoplay="0" rel="0" modest="1" />
          </Modal>
        )}
      </>
    );
  }
}

SongList.propTypes = {
  items: PropTypes.instanceOf(I.List).isRequired,
  toggleSelected: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(I.List).isRequired,
  color: PropTypes.string.isRequired,
};

export default SongList;
