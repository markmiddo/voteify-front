import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Logo from 'static/reminisce-logo-short.svg';
import styles from './styles.scss';

export const Loader = ({ width, height }) => (
  <div className={styles.wrapper}>
    <div
      style={{ width, height }}
      className={cx([styles.loader])}
    >
      <Logo />
    </div>
  </div>
);

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Loader.defaultProps = {
  width: 150,
  height: 115,
};
