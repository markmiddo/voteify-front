import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Fields } from 'redux-form/immutable';
import { Router, Link } from 'routes';
import validator from 'libs/validator';


import {
  Input, Textarea, ColorPicker, RangeDatePicker, UploadImage, UploadFile, SingleSelect,
} from 'components/form';
import { Col, Row } from 'components/grid';
import { Button, Text, Title } from 'components/ui';
import TooltipTitle from './TooltipTitle';

import cx from 'classnames';
import styles from './styles.scss';

class EventForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    handle: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    isBusy: PropTypes.bool,
  };

  static defaultProps = {
    isEdit: false,
  };

  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => ({ label: item, value: item }));

  render() {
    const {
      handle, handleSubmit, isEdit, isBusy, initialValues: event,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(handle)}>
        <div className={cx(styles.title, 'mt60 mb40')}>
          <Title size="lg">{ isEdit ? 'Update Event' : 'New Event' }</Title>
          <div className={styles.actions}>
            <Button type="light" htmlType="submit" className="ml40" disabled={isBusy}>{ isEdit ? 'Update' : 'Create!' }</Button>
            <Button type="danger" className="ml40" onClick={Router.back} disabled={isBusy}>Cancel</Button>
            {isEdit && event.get('id') && (
              <Link route="event" params={{ id: event.get('id') }} prefetch>
                <a href="">
                  <Button type="primary" className="ml40" disabled={isBusy}>Go To Event</Button>
                </a>
              </Link>
            )}
          </div>
        </div>
        <Row>
          <Col md={5}>
            <Text black className={styles.label}>Event info</Text>
            <Field name="name" component={Input} placeholder="Name" />
            <Field name="subtitle" component={Input} placeholder="Subtitle" />
            <Fields names={['start_date', 'end_date']} component={RangeDatePicker} />
            <Field name="place" component={Input} placeholder="Place" />
            <Text black className={cx(styles.label, 'mt10')}>Description</Text>
            <Field name="description" component={Textarea} rows={5} />
            <Text black className={cx(styles.label, 'mt10')}>Ticket URL</Text>
            <Field name="ticket_url" component={Input} placeholder="Enter ticket URL" />
          </Col>
          <Col md={7}>
            <Text black className={styles.label}>How many songs users need to vote for</Text>
            <Field
              name="track_count_for_vote"
              component={SingleSelect}
              className={cx(styles.select, 'mt10')}
              options={this.options}
            />
            <Row className="mt40">
              <Col lg={5}>
                <Text black className={styles.label}>Upload Artwork</Text>
                <Field
                  label={<TooltipTitle text="Landing art" title="For Landing Page" size="500x700 px" className={styles.lendingTooltip} />}
                  name="landing_image"
                  component={UploadImage}
                  width={500}
                  height={700}
                />
                <Field
                  label={<TooltipTitle text="Sharing art" title="For Share Page" size="300x430 px" className={styles.tooltip} />}
                  name="sharing_image"
                  component={UploadImage}
                  width={300}
                  height={430}
                />
                <Field
                  label={<TooltipTitle text="CSV File" title="Song List (CSV File)" size=".csv" className={styles.tooltip} />}
                  name="csv_file"
                  component={UploadFile}
                />
              </Col>
              <Col lg={7}>
                <Text black className={cx(styles.label, styles.colorPicker, 'mb10')}>Color for Design elements</Text>
                <Field name="color" component={ColorPicker} />
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={styles.delimiter} />
        <Row>
          <Col all={12}>
            <Text black className={cx(styles.label, 'mt10')}>Add Facebook Pixel to Campaign</Text>
            <Field name="fb_pixel" component={Input} placeholder="Facebook Pixel app ID" full />
            <Text black className={cx(styles.label, 'mt10')}>Add Google Analytics to Campaign</Text>
            <Field name="google_analytic" component={Input} rows={10} placeholder="Google Analytics app ID" full />
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'event',
  validate: validator({
    name: [['required']],
    subtitle: [['required']],
    from: [['required']],
    to: [['required']],
    place: [['required']],
    description: [['required']],
    ticket_url: [['required']],
    track_count_for_vote: [['required']],
    color: [['required']],
    landing_image: [['required']],
    sharing_image: [['required']],
    csv_file: [['required']],
  }),
})(EventForm);
