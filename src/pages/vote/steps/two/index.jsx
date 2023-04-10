import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createVoteAction, editVoteAction } from 'domain/vote/actions';
import { guestSetVoteDataAction, guestAuthModalOpenAction } from 'domain/guest/actions';
import { getVotingCacheForEvent, setVotingCacheForEvent } from '../../../../libs/votingCache';
import I from 'immutable';

import { Button } from 'components/ui/Button';
import SortableTracksList from 'pages/vote/sortableTracksList';

import cx from 'classnames';
import styles from './styles.scss';

class VoteStepTwo extends Component {
  state = {
    originEventTracks: I.List([]), // immutable
    currentEventTracks: [], // from Sortable Component, ordered, not immutable
  };

  componentDidMount() {
    const originEventTracks = this.extractTracksByID();
    this.setState({
      originEventTracks,
      currentEventTracks: originEventTracks.toJS(),
    });
  }

  extractTracksByID = () => {
    const { tracksIdForTop, event, isAuthorized } = this.props;

    return event.get('event_tracks')
      .filter(track => tracksIdForTop.includes(track.get('id')))
      .map((track) => {
        let position = 0;

        if (!isAuthorized) {
          const cachedTrackVotes = getVotingCacheForEvent(event.get('id')) || {};
          const cachedTrackVotesList = cachedTrackVotes.tracks || [];

          if (cachedTrackVotes.step === 2 && cachedTrackVotesList.includes(track.get('id'))) {
            position = cachedTrackVotesList.indexOf(track.get('id'));
          }
        }

        return track.set('position', position);
      })
      .sort((a, b) => {
        const pA = a.get('position');
        const pB = b.get('position');

        if (pA === 0 && pB === 0) return 0;
        if (pA < pB) return -1;
        if (pA > pB) return 1;

        return 0;
      });
  };

  onChangeOrder = (items) => {
    const { event, isAuthorized } = this.props;

    this.setState({ currentEventTracks: items });

    if (!isAuthorized) {
      const orderedEventTracksIds = items.map(track => track.id);
      setVotingCacheForEvent(event.get('id'), orderedEventTracksIds, 2);
    }
  };

  onClickFinishVote = () => {
    const {
      createVote,
      editVote,
      event,
      voteID,
      isAuthorized,
      guestSetVoteData,
      guestAuthModalOpen,
    } = this.props;
    const { currentEventTracks } = this.state;

    const topCount = event.get('track_count_for_vote');

    const resource = currentEventTracks.map((eventTrack, index) => {
      const isTop = index < topCount;
      const position = index + 1;

      return {
        position: isTop ? position : 0,
        is_top: isTop,
        event_track_id: eventTrack.id,
      };
    });

    if (isAuthorized) {
      voteID
        ? editVote({ id: voteID, resource })
        : createVote({ event_id: event.get('id'), resource });
    } else {
      guestSetVoteData(I.fromJS({ event_id: event.get('id'), resource }));
      guestAuthModalOpen();
    }
  };

  render() {
    const {
      event,
      changeStep,
    } = this.props;

    const {
      originEventTracks,
    } = this.state;

    return (
      <div>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Now select your top {event.get('track_count_for_vote')} songs.
          </h2>
          <h3 className="text-center">{event.get('top_songs_description')}</h3>
        </header>
        <section className={styles.listWrapper}>
          <h3 className={styles.listTitle}>Your Top {event.get('track_count_for_vote')}</h3>
          <SortableTracksList
            items={originEventTracks.toJS()}
            topCount={event.get('track_count_for_vote')}
            themeColor={event.get('color')}
            onChangeOrder={this.onChangeOrder}
          />
        </section>
        <footer className={styles.footer}>
          <Button type="accent" className="mr20" onClick={changeStep(1, true)}>back to list</Button>
          <Button className={event.get('color')} onClick={this.onClickFinishVote}>
            Submit Votes
          </Button>
        </footer>
      </div>
    );
  }
}

VoteStepTwo.propTypes = {
  event: PropTypes.instanceOf(I.Map).isRequired,
  vote: PropTypes.instanceOf(I.Map).isRequired,
  tracksIdForTop: PropTypes.instanceOf(I.List).isRequired,
  changeStep: PropTypes.func.isRequired,
  createVote: PropTypes.func.isRequired,
  editVote: PropTypes.func.isRequired,
  voteID: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  guestSetVoteData: PropTypes.func.isRequired,
  guestAuthModalOpen: PropTypes.func.isRequired,
};

export default connect(null,
  {
    createVote: createVoteAction,
    editVote: editVoteAction,
    guestSetVoteData: guestSetVoteDataAction,
    guestAuthModalOpen: guestAuthModalOpenAction,
  })(VoteStepTwo);
