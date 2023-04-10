import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Dark from './Dark';
import Light from './Light';
import styles from './styles.scss';

export const Tooltip = ({
  target, className, body, block,
}) => (
  <div className={cx(styles.wrapper, className, { 'd-inline-block': !block })}>
    {target}
    {body}
  </div>
);

Tooltip.Dark = Dark;
Tooltip.Light = Light;

Tooltip.propTypes = {
  target: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  className: PropTypes.string,
  block: PropTypes.bool,
};
