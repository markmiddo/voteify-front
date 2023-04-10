import { connect } from 'react-redux';
// import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { eventsSelector, eventsMetaSelector } from 'domain/event/selectors';

import EventsPage from './components/Main';


export default connect(
  createStructuredSelector({
    events: eventsSelector,
    meta: eventsMetaSelector,
  }),
  null,
)(EventsPage);
