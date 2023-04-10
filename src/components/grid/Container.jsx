import React from 'react';
import Types from 'prop-types';
import cx from 'classnames';

export function Container({
  className, children, fluid, ...rest
}) {
  return (
    <div
      className={cx({
        container: !fluid,
        'container-fluid': fluid,
      }, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  className: Types.string,
  fluid: Types.bool,
  children: Types.node,
};

Container.defaultProps = {
  fluid: false,
};
