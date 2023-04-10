import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const Text = ({
  children, className, capitalize, size, inline, black, ...rest
}) => (
  <p
    className={cx(styles.root, className, styles[size], {
      'd-inline-block': inline,
      [styles.capitalize]: capitalize,
      [styles.black]: black,
    })}
    {...rest}
  >
    {children}
  </p>
);

Text.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  capitalize: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  block: PropTypes.bool,
  black: PropTypes.bool,
};
