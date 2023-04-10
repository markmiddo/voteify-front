import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Dark = ({ text, position, className, customStyle }) => (
  <div className={cx(styles.tooltip, styles.dark, className, { [styles[`dark-${position}`]]: Boolean(position), [customStyle]: Boolean(customStyle) })}>
    {text}
  </div>
);

Dark.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.oneOf(['right', 'left', 'bottom']),
  customStyle: PropTypes.string,
};

export default Dark;
