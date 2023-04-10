import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import InputComponent from './Component';
import styles from './styles.scss';

export const ColorPicker = ({
  inline, full, className, meta: { touched, error }, input, ...rest
}) => (
  <div className={cx(styles.container, {
    'd-inline-block': inline,
    'full-width': full,
  }, className)}
  >
    <InputComponent
      {...input}
      {...rest}
    />
    <div className={styles.info}>
      <span className={cx(styles.text, { visible: touched && error })}>{touched && error}</span>
    </div>
  </div>
);

ColorPicker.propTypes = {
  label: PropTypes.string,
  inline: PropTypes.bool,
  full: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
};

ColorPicker.defaultProps = {
  inline: true,
};
