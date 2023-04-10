import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './styles.scss';

export const Button = ({
  children, component: Component, inline, full, className, type, htmlType, disabled, ...rest
}) => (
  <Component
    className={cx(styles.btn, {
      'd-inline-block': inline,
      'full-width': full,
      [styles[type]]: Boolean(type),
      [styles.disabled]: disabled,
    }, className)}
    type={htmlType}
    disabled={disabled}
    {...rest}
  >
    {children}
  </Component>
);

Button.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  full: PropTypes.bool,
  htmlType: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'light', 'danger', 'secondary', 'accent']),
  disabled: PropTypes.bool,
  component: PropTypes.oneOf(['button', Link]),
};

Button.defaultProps = {
  type: 'default',
  htmlType: 'button',
  component: 'button',
};
