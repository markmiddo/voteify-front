import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import validator from '../../../libs/validator';
import { fromJS } from 'immutable';

import { Title } from '../../../components/ui/Title';
import { Link } from '../../../routes';
import { Checkbox } from '../../../components/form/checkbox';
import { Button } from '../../../components/ui/Button';

import cx from 'classnames';
import styles from '../auth-styles.scss';

const OmniauthForm = ({ handleSubmit, iAgree }) => (
  <form onSubmit={handleSubmit} className={styles.form}>
    <Title size="lg">Sign up</Title>

    <Field
      name="rights"
      type="checkbox"
      component={Checkbox}
      className="mt15"
      label={(
        <Fragment>
                  I accept
          {' '}
          <Link route="/terms-and-conditions" prefetch>
            <a>Terms and Conditions</a>
          </Link>
        </Fragment>
            )}
    />
    <Button htmlType="submit" className="mt20" disabled={!iAgree}>Sign Up</Button>
  </form>

);

OmniauthForm.propTypes = {
  iAgree: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default compose(
  reduxForm({
    form: 'omniauthForm',
    initialValues: fromJS({
      type: 'Patron',
    }),
    validate: validator({
      rights: [['required', 'Must be checked']],
    }),
  }),
)(OmniauthForm);
