import { Flex } from 'components/grid';
import { Text, Tooltip } from 'components/ui';
import Hint from 'components/icons/hint.svg';
import React from 'react';
import PropTypes from 'prop-types';

const TooltipTitle = ({
  title, text, size, className,
}) => (
  <Flex className="mb10 mt20">
    <Text size="md" black>{title}</Text>
    <Tooltip
      target={<Hint />}
      body={<Tooltip.Light text={text} size={size} className={className} position="right" />}
      className="ml10"
    />
  </Flex>
);

TooltipTitle.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default TooltipTitle;
