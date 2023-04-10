import React from 'react';
import Types from 'prop-types';
import cx from 'classnames';

export function Row({
  className, children, ...rest
}) {
  return (
    <div className={cx('row', className)} {...rest}>{children}</div>
  );
}

Row.propTypes = {
  className: Types.string,
  children: Types.node,
};
