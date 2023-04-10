import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SingleSelectComponent = ({
  inline, full, className, onChange, ...rest
}) => (
  <Select
    className={cx({
      'd-inline-block': inline,
      'full-width': full,
    }, className)}
    instanceId="select"
    clearable={false}
    searchable={false}
    onChange={item => onChange(item.value)}
    {...rest}
  />
);

SingleSelectComponent.propTypes = {
  inline: PropTypes.bool,
  full: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
};

export default SingleSelectComponent;
