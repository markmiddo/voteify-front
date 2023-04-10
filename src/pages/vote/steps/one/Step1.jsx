import cx from 'classnames';
import { Col, Flex, Row } from 'components/grid';
import { Title, Tooltip, Button } from 'components/ui';
import I from 'immutable';
import Input from 'components/form/input/Component';
import injectReducer from 'libs/injects/injectReducer';
import AddSong from 'pages/vote/modal/AddSong';
import { addSongPopupStatusSelector, openAddSongPopupAction } from 'pages/vote/reducer';
import { createStructuredSelector } from 'reselect';
import React, { Component } from 'react';
import Hint from 'components/icons/hint.svg';
import Search from 'components/icons/search-icon.svg';
import Close from 'components/icons/close.svg';
import SongList from 'pages/vote/SongList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from '../../reducer';
import styles from './styles.scss';

class Step1 extends Component {
  state = {
    songFilter: '',
  }

  filterSong = (item) => {
    const { songFilter } = this.state;
    const filterUpper = songFilter.toUpperCase();
    return (
      item.getIn(['track', 'title'], '').toUpperCase().indexOf(filterUpper) > -1
      || item.getIn(['track', 'author'], '').toUpperCase().indexOf(filterUpper) > -1
    );
  }

  searchOnChange = ({ target }) => this.setState({ songFilter: target.value });

  clearSearch = () => this.setState({ songFilter: '' });

  render() {
    const {
      event, selected, toggleSelected, changeStep, addSongPopupIsOpen,
      openAddSongPopup,
    } = this.props;
    const { songFilter } = this.state;
    return (
      <>
        <div className="mt60 d-flex align-items-center flex-wrap">
          <div className={styles.songsHeader}>
            <Title size="lg" className={styles.songTittle}>Select your shortlist</Title>
            <Tooltip
              className={styles.hint}
              target={<Hint />}
              body={(
                <Tooltip.Dark
                  text="Select as many songs as you like in your shortlist,
                    if you want to choose a song that’s not in the list,
                    hit the ‘add song’ button. Songs that are added by you will
                    have a star next to them throughout the voting process.
                    Once you’ve finished your shortlist, hit 'next step’."
                  position="right"
                />
              )}
            />
          </div>
          <div className="d-flex align-items-center flex-grow-1 mr20 mb20">
            <div className={cx(styles.wrapInput, { mr20: !songFilter })}>
              <Input
                full
                inline
                placeholder="search tracklist"
                className={styles.search}
                value={songFilter}
                onChange={this.searchOnChange}
              />
              {songFilter
                ? <Close className={styles.closeIcon} onClick={this.clearSearch} />
                : <Search className={styles.searchIcon} />
              }
            </div>
            {!songFilter && <Button type="accent" onClick={openAddSongPopup}>add song</Button>}
          </div>
          <div className="mb20">
            <Button className={event.get('color')} onClick={changeStep(2)}>next step</Button>
          </div>
        </div>
        <Row>
          <Col>
            <div className={cx(styles.wrapSongs, styles.mxh600)}>
              <Title size="md" className="d-sm-none mb20">
                Tap a song to add it to your shortlist
              </Title>
              <SongList
                selected={selected}
                toggleSelected={toggleSelected}
                items={event.get('event_tracks', I.List()).filter(this.filterSong)}
                color={event.get('color')}
              />
            </div>
          </Col>
        </Row>
        {addSongPopupIsOpen && (
          <AddSong
            initialValues={{ event_id: event.get('id') }}
            color={event.get('color')}
            onSubmit={this.addSong}
          />
        )}
      </>
    );
  }
}

Step1.propTypes = {
  event: PropTypes.instanceOf(I.Map).isRequired,
  toggleSelected: PropTypes.func.isRequired,
  changeStep: PropTypes.func.isRequired,
  openAddSongPopup: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(I.List).isRequired,
  addSongPopupIsOpen: PropTypes.bool.isRequired,
};

export default compose(
  injectReducer({ key: 'vote-page', reducer }),
  connect(createStructuredSelector({
    addSongPopupIsOpen: addSongPopupStatusSelector,
  }), { openAddSongPopup: openAddSongPopupAction }),
)(Step1);
