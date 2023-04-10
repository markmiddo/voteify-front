import {
  Header, Image, Date, Links, Description, SignUp,
} from 'pages/event/show/components';
import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import {
  Row, Col, Flex,
} from 'components/grid';

const MobileEvent = ({ event, isAuthorized, role }) => (
  <Row className="d-lg-none">
    <Col>
      <Header event={event} />
      <Row>
        <Col md={6} sm={7} xs={7}><Image event={event} /></Col>
        <Col md={6} sm={5} xs={5}><Date event={event} /></Col>
      </Row>
      <Links event={event} role={role} flexDirection="column" alignItems="center" />
      <Description event={event} className="mt20 mb10" />
    </Col>
  </Row>
);

MobileEvent.propTypes = {
  event: PropTypes.instanceOf(I.Map).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  role: PropTypes.oneOf(['Patron']),
};

export default MobileEvent;
