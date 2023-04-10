import React from 'react';
import Types from 'prop-types';
import cx from 'classnames';

export function Col({
  className, all, xs, sm, md, lg, xl, auto, children, ...rest
}) {
  const hasAutoSize = Boolean(auto);
  const hasMediaSize = Boolean(xs || sm || md || lg);

  return (
    <div
      className={cx({
        [`col-${all}`]: !hasMediaSize && !hasAutoSize && Boolean(all),
        'col-auto': !hasMediaSize && Boolean(auto),
        [`col-${xs}`]: Boolean(xs),
        [`col-sm-${sm}`]: Boolean(sm),
        [`col-md-${md}`]: Boolean(md),
        [`col-lg-${lg}`]: Boolean(lg),
        [`col-xl-${xl}`]: Boolean(xl),
      }, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Col.propTypes = {
  className: Types.string,
  xs: Types.oneOfType([Types.number, Types.string]),
  sm: Types.oneOfType([Types.number, Types.string]),
  md: Types.oneOfType([Types.number, Types.string]),
  lg: Types.oneOfType([Types.number, Types.string]),
  xl: Types.oneOfType([Types.number, Types.string]),
  all: Types.oneOfType([Types.number, Types.string]),
  auto: Types.bool,
  children: Types.node,
};

Col.defaultProps = {
  auto: false,
  all: 12,
};
