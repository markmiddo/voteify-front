/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Close from './close.svg';
import styles from './styles.scss';

export const Modal = ({
  children, cancel, close, className, containerClassName, ...rest
}) => (
  <div className={cx(styles.container, containerClassName)}>
    <div className={styles.overlay} onClick={() => cancel()} />
    <div className={cx(styles.popup, className)} {...rest}>
      {children}
      {close ? <Close className={styles.close} onClick={() => cancel()} /> : null}
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
  cancel: PropTypes.func,
  containerClassName: PropTypes.string,
};

Modal.defaultProps = {
  cancel: () => null,
};
