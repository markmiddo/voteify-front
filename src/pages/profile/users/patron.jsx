import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I from 'immutable';
import { Field, reduxForm } from 'redux-form/lib/immutable';
import validator from 'libs/validator';
import { Text, Button } from 'components/ui';
import { Input } from 'components/form';
import InstagramIcon from 'components/icons/social/instagram.svg';
import FacebookIcon from 'components/icons/social/facebook.svg';


import styles from '../styles.scss';

class PatronUser extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(I.Map).isRequired,
    isEdit: PropTypes.bool.isRequired,
    handle: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      user, isEdit, handleSubmit, handle,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(handle)}>
        <div className="ml20 mt60 mb25">
          {isEdit
            ? (<Field name="name" className={styles.editInput} component={Input} placeholder="Name" />)
            : (<Text black className={styles.name}>{user.get('name')}</Text>)
          }
          <Text size="md">{user.get('email')}</Text>
          <div className="mt20">
            {isEdit && <Button htmlType="submit" className="mt20">Update</Button>}
          </div>
        </div>
      </form>
    );
  }
}

export default compose(
  connect((_, props) => ({
    initialValues: {
      name: props.user.get('name'),
      instagram_url: props.user.get('instagram_url'),
      fb_url: props.user.get('fb_url'),
    },
  })),
  reduxForm({
    form: 'profile',
    validate: validator({
      name: [['required']],
      instagram_url: [['instagramUrl']],
      fb_url: [['facebookUrl']],
    }),
  }),
)(PatronUser);
