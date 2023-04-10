import { Text } from 'components/ui/Text';
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Check from './checkWhite.svg';

const Checkbox = ({
  checked, inline, full, containerClassName, className, ...rest
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
  <label className={cx(styles.container, containerClassName)}>
    <Text size="md" black>{checked ? 'Added' : 'Add to list'}</Text>
    <input
      className={cx({
        'd-inline-block': inline,
        'full-width': full,
      }, className)}
      checked={checked}
      {...rest}
    />
    <span className={styles.checkmark}><Check className={styles.icon} /></span>
  </label>
);

Checkbox.propTypes = {
  inline: PropTypes.bool,
  full: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
