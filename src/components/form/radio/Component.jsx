import React, { Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const RadioButtonComponent = ({
  inline, full, className, ...rest
}) => (
  <Fragment>
    <input
      className={cx({
        'd-inline-block': inline,
        'full-width': full,
      }, className)}
      {...rest}
    />
    <span className={styles.checkmark} />
  </Fragment>
);

RadioButtonComponent.propTypes = {
  inline: PropTypes.bool,
  full: PropTypes.bool,
  className: PropTypes.string,
};

export default RadioButtonComponent;
