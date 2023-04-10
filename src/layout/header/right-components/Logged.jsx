import { Text } from 'components/ui/Text';
import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import I from 'immutable';
import PropTypes from 'prop-types';
import { Col, Flex } from 'components/grid';
import userIcon from './user-icon.png';
import styles from '../styles.scss';

export const Logged = ({ user, logOut }) => {
  const userAvatarUrl = user.getIn(['avatar', 'small', 'url']);
  const isPatron = user.get('type') === 'Patron';
  const avatarUrl = userAvatarUrl ? `${process.env.IMAGE_PREFIX}${userAvatarUrl}` : userIcon;
  return (
    <Col auto>
      <Flex alignItems="center" className={styles.dropDown}>
        <img src={avatarUrl} className={styles.image} alt="user avatar" />
        <Text black className={cx(styles.username, 'ml10')}>{user.get('name')}</Text>
        <div className={styles.triangle} />
        <div className={styles.dropDownContent}>
          <div className={styles.dropDownBody}>
            <Link prefetch href="/profile"><Text black className={styles.element}>My Votes</Text></Link>
            {isPatron
              ? <Link href="/events"><Text black className={styles.element}>All events</Text></Link>
              : <Link href="/dashboard"><Text black className={styles.element}>Dashboard</Text></Link>
            }
            <Text onClick={logOut} className={cx(styles.element, styles.logOut)}>Log out</Text>
          </div>
        </div>
      </Flex>
    </Col>
  );
};

Logged.propTypes = {
  user: PropTypes.instanceOf(I.Map).isRequired,
  logOut: PropTypes.func.isRequired,
};
