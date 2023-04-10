// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Col, Container, Flex, Row,
} from 'components/grid';
import I from 'immutable';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { envInstanceSelector } from 'domain/env/selectors';
import { updateProfileAction, getProfileContentAction } from 'domain/env/actions';
import { Text, Title } from 'components/ui';
import { PatronUser } from './users';
import { PatronContent } from './contents';
import EditIcon from './edit.svg';
import userImage from './user-icon.png';
import ReplaceImage from './replace-image';
import styles from './styles.scss';


class Profile extends PureComponent {
  static async getInitialProps({ ctx }) {
    ctx.store.dispatch(getProfileContentAction());
  }

  state = {
    modalOpen: false,
    isEdit: false,
  };

  handleEdit = () => {
    const { isEdit } = this.state;

    this.setState({
      isEdit: !isEdit,
    });
  };

  handleUpdate = async (formData) => {
    const { updateProfile, user } = this.props;
    await updateProfile({ data: { resource: formData }, id: user.get('id') });
    this.handleEdit();
  };

  toggleModal = () => this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));

  render() {
    const { user } = this.props;
    const { modalOpen, isEdit } = this.state;
    const userAvatarUrl = user.getIn(['avatar', 'url']);
    const avatarUrl = userAvatarUrl ? `${process.env.IMAGE_PREFIX}${userAvatarUrl}` : userImage;
    return (
      <div className={styles.root}>
        {modalOpen && <ReplaceImage cancel={this.toggleModal} />}
        <Container>
          <Row>
            <Col md={5}>
              <Flex alignItems="end" className={styles.mainTitle}>
                <Title size="lg" className="d-none d-md-block">Profile</Title>
                <div role="button" tabIndex="0" onClick={this.handleEdit} className={cx(styles.edit, 'ml40')}>
                  <EditIcon className="mr5" />
                  <Text>Edit</Text>
                </div>
              </Flex>
              <Flex className={cx(styles.wrapProfile, 'mt40')}>
                <div className="text-center">
                  <img src={avatarUrl} alt="user avatar" className={styles.avatar} onClick={this.toggleModal} />
                  <Title size="md" className={cx(styles.replace, 'mt10', 'd-none d-lg-block')} onClick={this.toggleModal}>Update Image</Title>
                </div>
                <PatronUser user={user} isEdit={isEdit} handle={this.handleUpdate} />
              </Flex>
            </Col>
            <Col md={7}>
              <PatronContent user={user} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.instanceOf(I.Map).isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default compose(
  connect(createStructuredSelector({
    user: envInstanceSelector,
  }), {
    updateProfile: updateProfileAction,
  }),
)(Profile);
