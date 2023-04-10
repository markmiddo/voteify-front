/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { Modal } from 'components/ui/Modal';
import SignInForm from './form/signInForm';
import SignUpForm from './form/signUpForm';

import styles from './styles.scss';

class AuthModal extends PureComponent {
  static propTypes = {
    cancel: PropTypes.func.isRequired,
  };

  state = {
    formType: 'signIn',
  };

  onChangeFormType = (type) => {
    this.setState({ formType: type });
  };

  render() {
    const { cancel } = this.props;
    const { formType } = this.state;

    return (
      <Modal className={styles.modalWrapper} cancel={cancel}>
        {formType === 'signIn' && (
          <SignInForm
            onChangeFormType={this.onChangeFormType}
          />
        )}
        {formType === 'signUp' && (
          <SignUpForm
            onChangeFormType={this.onChangeFormType}
          />
        )}
      </Modal>
    );
  }
}

export default compose()(AuthModal);
