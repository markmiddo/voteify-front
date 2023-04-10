import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const TextInputComponent = ({
  inline, full, error, className, ...rest
}) => (
  <input
    className={cx(styles.input, {
      'd-inline-block': inline,
      [styles['full-width']]: full,
      [styles.error]: error,
    }, className)}
    {...rest}
  />
);

TextInputComponent.propTypes = {
  inline: PropTypes.bool,
  full: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
};

export default TextInputComponent;
