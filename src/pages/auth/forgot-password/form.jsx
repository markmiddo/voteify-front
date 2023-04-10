import { Button } from 'components/ui/Button/index';
import { Text } from 'components/ui/Text/index';
import { Title } from 'components/ui/Title/index';
import { forgotPasswordAction } from 'domain/env/index';
import validator from 'libs/validator';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from 'pages/auth/auth-styles.scss';
import cx from 'classnames';
import { Input } from 'components/form/index';

const Form = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit}>
    <Title size="lg">Forgot Your Password?</Title>
    <Text className={cx(styles.role, 'mt10', 'mb40')}>Get a reset password link sent to your email.</Text>
    <Field name="email" component={Input} placeholder="email" />
    <Button htmlType="submit" className="mt20">Send Link</Button>
    {error && <p className={styles.error}>{error}</p>}
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default compose(
  // eslint-disable-next-line no-unused-vars
  connect(_ => ({
    initialValues: {
      redirect_url: `${process.env.FRONTEND_URL}/reset-password`,
    },
  })),
  reduxForm({
    form: 'forgot',
    validate: validator({
      email: [['required'], ['email']],
    }),
    onSubmit: (values, dispatch) => dispatch(forgotPasswordAction(values)),
  }),
)(Form);
