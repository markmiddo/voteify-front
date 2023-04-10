import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const Title = ({
  children, className, capitalize, size, inline, ...rest
}) => (
  <h2
    className={cx(styles.root, className, styles[size], {
      'd-inline-block': inline,
      [styles.capitalize]: capitalize,
    })}
    {...rest}
  >
    {children}
  </h2>
);

Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  capitalize: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  block: PropTypes.bool,
};
