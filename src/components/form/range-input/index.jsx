import { Flex } from 'components/grid';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const RangeInput = ({ inputProps, label, ...rest }) => (
  <Flex alignItems="center" {...rest}>
    <span className={styles.label}>{label}</span>
    <input
      className={styles.range}
      {...inputProps}
    />
  </Flex>
);

RangeInput.propTypes = {
  inputProps: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }),
  label: PropTypes.string.isRequired,
};
