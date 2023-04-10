import {
  Description, SignUp, Date, Header, Image, Links,
} from 'pages/event/show/components';
import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import {
  Row, Col,
} from 'components/grid';

const DesktopEvent = ({ event, isAuthorized, role }) => (
  <Row className="d-none d-lg-flex">
    <Col md={8}><Image event={event} /></Col>
    <Col md={4}>
      <Header event={event} />
      <Links event={event} alignItems="center" className="mt40" />
      <div className="mt60"><Date event={event} /></div>
      <Description event={event} className="mt40" />
    </Col>
  </Row>
);

DesktopEvent.propTypes = {
  event: PropTypes.instanceOf(I.Map).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  role: PropTypes.oneOf(['Patron']),
};

export default DesktopEvent;
