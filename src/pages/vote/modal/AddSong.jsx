import cx from 'classnames';
import { addSongAction } from 'domain/vote';
import { Input } from 'components/form/input';
import { Text, Modal, Button } from 'components/ui';
import validator from 'libs/validator';
import { closeAddSongPopupAction } from 'pages/vote/reducer';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import styles from '../styles.scss';

const AddSong = ({
  error, cancel, color, handleSubmit,
}) => (
  <Modal cancel={cancel} className={cx(styles.limitModal, 'text-center')}>
    <form onSubmit={handleSubmit}>
      <Text black className={cx(styles.fs18, 'mb20')}>Add New Song</Text>
      <Field name="author" component={Input} placeholder="Artist" />
      <Field name="title" component={Input} placeholder="Song Name" />
      <Button htmlType="submit" className={color}>submit</Button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  </Modal>
);

AddSong.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default compose(
  connect(null, {
    cancel: closeAddSongPopupAction,
  }),
  reduxForm({
    form: 'addSong',
    validate: validator({
      author: [['required']],
      title: [['required']],
    }),
    onSubmit: (values, dispatch) => dispatch(addSongAction(values)),
  }),
)(AddSong);
