import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import InputComponent from './Component';
import styles from './styles.scss';

export const UploadFile = ({
  label, inline, full, className, meta: { touched, error }, input, ...rest
}) => (
  <div className={cx(styles.root, {
    'd-inline-block': inline,
    'full-width': full,
  }, className)}
  >
    {label}
    <InputComponent
      {...input}
      {...rest}
      error={Boolean(touched && error)}
      inline={inline}
      full={full}
    />
    <span className={cx(styles.loaded, { [styles.visible]: Boolean(input.value) })}>
      File loaded
    </span>
    <div className={styles.info}>
      <span className={cx(styles.text, { [styles.visible]: touched && error })}>
        {touched && error}
      </span>
    </div>
  </div>
);

UploadFile.propTypes = {
  label: PropTypes.node,
  inline: PropTypes.bool,
  full: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
};
