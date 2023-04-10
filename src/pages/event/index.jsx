import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  envIsAuthorized, envRoleSelector, setStatisticAction,
} from 'domain/env';
import { eventSelector, eventLoadingSelector } from 'domain/event/selectors';
import { getEventAction } from 'domain/event/actions';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';
import I from 'immutable';

import Head from 'next/head';
import PixelScript from 'components/FbPixel/pixel';
import GAscript from 'components/GA/ga';
import { Container } from 'components/grid';
import DocTitle from 'components/ui/DocTitle';
import DesktopEvent from './show/desktop';
import MobileEvent from './show/mobile';
import { Loader } from '../../components/ui/Loader';

class EventShow extends Component {
  static async getInitialProps({ ctx }) {
    const { id } = ctx.query;
    if (id) {
      ctx.store.dispatch(getEventAction(id));
    }
  }

  componentDidMount() {
    const { setStatistic, router } = this.props;
    setStatistic({ event_id: router.query.id });
  }

  render() {
    const {
      event, isAuthorized, role, loading, router,
    } = this.props;

    const { query } = router;
    const { image } = query;

    if (loading) return <Loader />;

    return (
      <Container>
        <Head>
          <meta property="og:title" content={event.get('facebook_title') || event.get('name')} />
          <meta property="og:url" content={`${process.env.FRONTEND_URL}/event/${event.get('id')}?image=${image}`} />
          <meta property="og:description" content={event.get('facebook_description') || event.get('description')} />
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="315" />
          {event.get('google_analytic') && (<GAscript ID={event.get('google_analytic')} />)}
          {event.get('fb_pixel') && (<PixelScript ID={event.get('fb_pixel')} />)}
        </Head>
        <DocTitle>
          {event.get('name', 'Event')}
        </DocTitle>
        <DesktopEvent event={event} isAuthorized={isAuthorized} role={role} />
        <MobileEvent event={event} isAuthorized={isAuthorized} role={role} />
      </Container>
    );
  }
}

EventShow.propTypes = {
  event: PropTypes.instanceOf(I.Map).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  role: PropTypes.oneOf(['Patron']),
  setStatistic: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
  err: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
};

export default compose(
  withRouter,
  connect(createStructuredSelector({
    event: eventSelector,
    isAuthorized: envIsAuthorized,
    role: envRoleSelector,
    loading: eventLoadingSelector,
  }), { setStatistic: setStatisticAction }),
)(EventShow);
