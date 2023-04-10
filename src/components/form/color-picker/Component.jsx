/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const colors = ['purple', 'orange', 'green', 'blue', 'pink'];

const ColorPickerComponent = ({ value, onChange }) => (
  <div>
    {colors.map(color => (
      <div
        key={color}
        onClick={() => onChange(color)}
        className={cx(styles.item, color, 'mr10', { [styles.active]: value === color })}
      />
    ))
  }
  </div>
);

ColorPickerComponent.propTypes = {
  value: PropTypes.oneOf([...colors, '']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPickerComponent;
