import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import I from 'immutable';
import { connect } from 'react-redux';
import { getSomeEventsAction, getAllEventsAction } from 'domain/event/actions';
import { Title } from 'components/ui/Title/index';
import { Loader } from 'components/ui/Loader';
import SingleSelect from 'components/form/single-select/Component';
import {
  Container, Row, Col, Flex,
} from 'components/grid/index';

import DocTitle from 'components/ui/DocTitle';
import Card from '../Card';

import styles from '../styles.scss';
import loader from '../../../../images/loading.gif';

function buildQuery(object) {
  return `${Object.keys(object).reduce((string, key) => `${string}${key}=${object[key]}&`, '').slice(0, -1)}`;
}

function getLimit(defaultLimit) {
  if (typeof window !== 'undefined') {
    const limit = 2 * Math.ceil(window.innerHeight / 370);
    return defaultLimit > limit ? defaultLimit : limit;
  }
  return defaultLimit;
}

const loadedEvents = 4;

const defaultValues = {
  order: 'views',
  limit: getLimit(),
  offset: 0,
};

class EventsPageComponent extends Component {
  filterOptions = [
    { value: 'views', label: 'Popular' },
    { value: 'sharing', label: 'Shared' },
  ];

  constructor(props) {
    super(props);
    const { order, limit, offset } = defaultValues;
    this.state = { order, limit, offset };
  }

  componentDidMount() {
    const { loadAllEvents } = this.props;
    const { order, limit, offset } = defaultValues;

    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      loadAllEvents(buildQuery({ order, limit, offset }));
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const {
      events, meta, loadSomeEvents, someLoading,
    } = this.props;
    const { order, limit, offset } = this.state;

    if (!someLoading && window.innerHeight
      + document.documentElement.scrollTop > document.documentElement.offsetHeight - 60) {
      if (events.size < meta.get('all') && offset < meta.get('all')) {
        const newOffset = offset + limit;
        const newLimit = loadedEvents;
        this.setState({
          offset: newOffset,
          limit: newLimit,
        });
        loadSomeEvents(buildQuery({ order, limit: newLimit, offset: newOffset }));
      }
    }
  };

  render() {
    const {
      events, loadAllEvents, loading, someLoading,
    } = this.props;
    const { order, limit, offset } = this.state;

    return (
      <Container>
        <DocTitle>
          Events
        </DocTitle>
        <Flex justifyContent="between" className={styles.eventsBlock}>
          <Title size="lg">All Events</Title>
          <SingleSelect
            className={cx(styles.select, 'd-none d-md-block')}
            options={this.filterOptions}
            value={order}
            onChange={(value) => {
              const data = { order: value, limit: offset + limit, offset: 0 };
              this.setState(data);
              loadAllEvents(buildQuery(data));
            }}
          />
        </Flex>
        <Container className={styles.eventsPlate}>
          { loading && !events.size && (<Loader />) }
          { !loading && !events.size && (
            <h2 className={styles.eventsPlaceholder}>
              No upcoming events so far :(
            </h2>
          )}
          {events.map((item, idx) => (!(idx % 2) ? (
            <Row key={`row-${item.get('id')}`} className={styles.eventRow}>
              {[
                events.get(idx),
                ...((idx + 1) < events.size
                  ? [events.get(idx + 1)]
                  : []
                )].map(itemIn => (
                  <Col key={`col-${itemIn.get('id')}`} className={cx(styles.eventItem, styles.noBorder)} lg={6}>
                    <Card event={itemIn} />
                  </Col>
              ))}
            </Row>
          ) : null))}
          { someLoading && (<div className={cx(styles.loading, styles.loadingMargin)}><img src={loader} height={80} alt="Loading" /></div>) }
        </Container>
      </Container>
    );
  }
}

EventsPageComponent.propTypes = {
  events: PropTypes.instanceOf(I.List),
  meta: PropTypes.instanceOf(I.Map),
  loadAllEvents: PropTypes.func,
  loadSomeEvents: PropTypes.func,
  loading: PropTypes.bool,
  someLoading: PropTypes.bool,
};

EventsPageComponent.defaultProps = {
  events: I.List([]),
  meta: I.Map([]),
  someLoading: false,
  loading: true,
};

const mapDispatchToProps = {
  loadAllEvents: getAllEventsAction,
  loadSomeEvents: getSomeEventsAction,
};

export default connect(
  state => ({
    loading: state.getIn(['event', 'loading']),
    someLoading: state.getIn(['event', 'someLoading']),
  }),
  mapDispatchToProps,
)(EventsPageComponent);
