import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/lib/immutable';

import validator from 'libs/validator';

import { contactUsAction } from 'domain/env';

import { Input, Textarea } from 'components/form';
import Page from 'components/GenericAboutPage';
import { Button } from 'components/ui/Button';
import { Flex } from 'components/grid';

import styles from './styles.scss';

const ContactUs = ({ handleSubmit }) => (
  <Page>
    <Page.Header>
      Contact us
    </Page.Header>
    <Page.Content>
      <div className="mb20">Got an enquiry? Fill out the details below or shoot us an email and a team member will be in contact within 24 hours.</div>
      <div className="row">
        <div className="col-sm-6">
          <p>Voteify Pty Ltd</p>
          <p>Prahran, Vic</p>
          <p>3181</p>
          <p><a href="mailto:info@voteify.com">info@voteify.com</a></p>
        </div>
        <div className="col-sm-6">
          <Flex flexDirection="column">
            <form onSubmit={handleSubmit}>
              <Field name="email" component={Input} placeholder="Email" />
              <Field
                name="message_text"
                placeholder="Write your message here"
                component={Textarea}
                rows={8}
                full
              />
              <Button htmlType="submit" className={styles.button}>Write to us</Button>
            </form>
          </Flex>
        </div>
      </div>
    </Page.Content>
  </Page>
);

ContactUs.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'contactUs',
    validate: validator({
      email: [['required'], ['email']],
      message_text: [['required']],
    }),
    onSubmit: (values, dispatch) => dispatch(contactUsAction(values)),
  }),
)(ContactUs);
