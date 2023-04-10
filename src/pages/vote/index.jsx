import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'next/router';
import { eventSelector, eventLoadingSelector } from 'domain/event/selectors';
import { getEventVoteAction, clearVoteAction } from 'domain/vote/actions';
import { voteSelector, voteLoadingSelector } from 'domain/vote/selectors';
import { setStatisticAction, envIsAuthorized } from 'domain/env';
import { createStructuredSelector } from 'reselect';
import { formatDate } from 'react-day-picker/moment';
import { getVotingCacheForEvent, setVotingCacheForEvent } from '../../libs/votingCache';
import { redirect } from '../../libs/redirect';
import I from 'immutable';

import {
  Col, Container, Row,
} from 'components/grid';
import {
  Title, Text, Loader,
} from 'components/ui';
import LimitPopup from 'pages/vote/modal/LimitPopup';
import Step1 from 'pages/vote/steps/one/Step1';
import StepTwo from 'pages/vote/steps/two';

import cx from 'classnames';
import styles from './styles.scss';

class VoteStart extends Component {
  static async getInitialProps({ ctx }) {
    const { id } = ctx.query;
    if (id) {
      ctx.store.dispatch(getEventVoteAction(id));
    }
  }

  state = {
    tracksIdForTop: I.List(),
    step: 1,
    limitPopupIsOpen: false,
    firstLoad: true,
  };

  componentDidMount() {
    const { setStatistic, router, event, isAuthorized } = this.props;
    setStatistic({ event_id: router.query.id });

    // Redirect to share page if a vote for current event has already been created
    if (event.getIn(['vote', 'id'], null)) {
      redirect(`/share/${event.getIn(['vote', 'id'])}`);
    } else if (!isAuthorized) {
      const cachedTrackVotes = getVotingCacheForEvent(event.get('id', router.query.id)) || {};
      const cachedTrackVotesList = I.List(cachedTrackVotes.tracks || []);

      if (cachedTrackVotesList.size) {
        this.setState({
          tracksIdForTop: cachedTrackVotesList,
          step: cachedTrackVotes.step,
        });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { vote } = nextProps;
    const { firstLoad } = prevState;
    if (vote.size && firstLoad) {
      return {
        tracksIdForTop: vote.get('event_track_votes').map(el => el.getIn(['event_track', 'id'])),
        step: 2,
        firstLoad: false,
      };
    }
    return {};
  }

  componentWillUnmount() {
    const { clearVote } = this.props;
    clearVote();
  }

  toggleSelected = id => () => {
    const { tracksIdForTop } = this.state;
    const { event, isAuthorized } = this.props;

    const index = tracksIdForTop.indexOf(id);
    const selectedTracksForUpdate = index > -1
      ? tracksIdForTop.delete(index)
      : tracksIdForTop.push(id);

    if (!isAuthorized) {
      setVotingCacheForEvent(
        event.get('id'),
        selectedTracksForUpdate.toJS(),
        1,
      );
    }

    return this.setState({ tracksIdForTop: selectedTracksForUpdate });
  };

  changeStep = step => () => {
    const { tracksIdForTop } = this.state;
    const { event, isAuthorized } = this.props;

    if (event.get('track_count_for_vote') >= tracksIdForTop.size) {
      return this.setState({ limitPopupIsOpen: true });
    }

    if (!isAuthorized) {
      setVotingCacheForEvent(event.get('id'), tracksIdForTop.toJS(), step);
    }

    return this.setState({ step });
  };

  closeLimitPopup = () => this.setState({ limitPopupIsOpen: false });

  switchStep = () => {
    const { event, vote, isAuthorized } = this.props;
    const { step, tracksIdForTop } = this.state;
    const voteID = vote.get('id', 0);

    const props = {
      event,
      changeStep: this.changeStep,
      toggleSelected: this.toggleSelected,
    };

    switch (step) {
      case 1: return <Step1 {...props} selected={tracksIdForTop} />;
      case 2: return (
        <StepTwo
          isAuthorized={isAuthorized}
          event={event}
          tracksIdForTop={tracksIdForTop}
          changeStep={props.changeStep}
          voteID={voteID}
          vote={vote}
        />
      );
      default: return null;
    }
  };

  render() {
    const { event, eventIsBusy, voteIsBusy } = this.props;
    const { limitPopupIsOpen, tracksIdForTop } = this.state;

    if (eventIsBusy || voteIsBusy) return <Loader />;

    return (
      <Container>
        <Row>
          <Col className="mt60">
            <Row>
              <Col auto>
                <img
                  src={`${process.env.IMAGE_PREFIX}${event.getIn(['landing_image', 'medium', 'url'])}`}
                  alt="party"
                  className={styles.image}
                />
              </Col>
              <div className={cx('col', styles.relative)}>
                <Title className={styles.title}>{event.get('name')}</Title>
                <Text className={cx(styles.subtitle, 'mt10', 'd-none', 'd-sm-block')} black>{event.get('subtitle')}</Text>
                <Text className={cx(styles.subtitle, 'mt10', 'd-sm-none')} black>
                  {event.get('shortlist_description') || event.get('subtitle')}
                </Text>
                <div className={styles.hiddenInfo}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col sm={6} className="mt20">
                          <Text size="sm" capitalize>Start date</Text>
                          <Text className={styles.date} black>{formatDate(event.get('start_date'), 'll')}</Text>
                        </Col>
                        <Col sm={6} className="mt20">
                          <Text size="sm" capitalize>End date</Text>
                          <Text className={styles.date} black>{formatDate(event.get('end_date'), 'll')}</Text>
                        </Col>
                        <Col sm={6} className="mt20">
                          <Text size="sm" capitalize>Place</Text>
                          <Text className={styles.date} black>{event.get('place')}</Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Text black className={cx(styles.about, 'mt20')}>About event</Text>
                      <Text className="mt10" size="md">{event.get('description')}</Text>
                    </Col>
                  </Row>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        {event.size > 0 && this.switchStep()}
        {limitPopupIsOpen && (
          <LimitPopup
            count={tracksIdForTop.size}
            limit={event.get('track_count_for_vote')}
            color={event.get('color')}
            cancel={this.closeLimitPopup}
          />
        )}
      </Container>
    );
  }
}

VoteStart.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  event: PropTypes.instanceOf(I.Map).isRequired,
  vote: PropTypes.instanceOf(I.Map).isRequired,
  voteIsBusy: PropTypes.bool.isRequired,
  eventIsBusy: PropTypes.bool.isRequired,
  clearVote: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  connect(createStructuredSelector({
    isAuthorized: envIsAuthorized,
    event: eventSelector,
    vote: voteSelector,
    voteIsBusy: voteLoadingSelector,
    eventIsBusy: eventLoadingSelector,
  }), { setStatistic: setStatisticAction, clearVote: clearVoteAction }),
)(VoteStart);
