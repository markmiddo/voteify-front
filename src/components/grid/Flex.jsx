import React from 'react';
import Types from 'prop-types';
import cx from 'classnames';

export function Flex({
  className, children, alignItems, alignContent, justifyContent, flexDirection, ...rest
}) {
  return (
    <div
      className={cx('d-flex', {
        [`flex-${flexDirection}`]: Boolean(flexDirection),
        [`align-items-${alignItems}`]: Boolean(alignItems),
        [`align-content-${alignContent}`]: Boolean(alignContent),
        [`justify-content-${justifyContent}`]: Boolean(justifyContent),
      }, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Flex.propTypes = {
  className: Types.string,
  children: Types.node,
  alignItems: Types.string,
  alignContent: Types.string,
  justifyContent: Types.string,
  flexDirection: Types.string,
};
