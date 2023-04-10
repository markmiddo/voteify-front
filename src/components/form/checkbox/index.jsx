import { Text } from 'components/ui';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import InputComponent from './Component';
import styles from './styles.scss';

export const Checkbox = ({
  label, inline, full, className, meta: { error, dirty }, input, ...rest
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
  <label className={cx(styles.container, {
    'd-inline-block': inline,
    'full-width': full,
    mr10: inline,
  }, className)}
  >
    <Text size="md" black={input.checked}>{label}</Text>
    <InputComponent
      {...input}
      {...rest}
      inline={inline}
      full={full}
    />
    <div className={styles.info}>
      <span className={cx(styles.text, { [styles.visible]: dirty && error })}>
        {dirty && error}
      </span>
    </div>
  </label>
);

Checkbox.propTypes = {
  label: PropTypes.node,
  inline: PropTypes.bool,
  full: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  input: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
};
