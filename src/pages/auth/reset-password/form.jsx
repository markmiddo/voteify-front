import { Button } from 'components/ui/Button/index';
import { Text } from 'components/ui/Text/index';
import { Title } from 'components/ui/Title/index';
import { resetPasswordAction } from 'domain/env/index';
import validator from 'libs/validator';
import { withRouter } from 'next/router';
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
    <Title size="lg">Reset password</Title>
    <Text className={cx(styles.role, 'mt10', 'mb40')}>set new password</Text>
    <Field name="password" component={Input} placeholder="password" type="password" />
    <Field name="password_confirmation" component={Input} placeholder="repeat password" type="password" />
    <Button htmlType="submit" className="mt20">reset</Button>
    {error && <p className={styles.error}>{error}</p>}
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default compose(
  withRouter,
  connect((_, props) => ({
    initialValues: {
      query: props.router.query,
    },
  })),
  reduxForm({
    form: 'reset',
    validate: validator({
      password: [['required'], ['minLength:6', 'Must be longer then 6']],
      password_confirmation: [['required'], ['equal:password']],
    }),
    onSubmit: (values, dispatch) => dispatch(resetPasswordAction(values)),
  }),
)(Form);
