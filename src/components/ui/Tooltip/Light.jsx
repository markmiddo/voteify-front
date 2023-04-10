import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Text, Title } from 'components/ui';
import { Flex } from 'components/grid';
import styles from './styles.scss';

const Light = ({
  text, size, position, className,
}) => (
  <div className={cx(
    styles.tooltip,
    styles.light,
    className,
    { [styles[position]]: Boolean(position) },
  )}
  >
    <Flex>
      <Flex flexDirection="column" alignItems="center" justifyContent="center" className={styles.page}>
        <Title size="md" className={styles.pageName}>{text}</Title>
        <Text size="md" black>{size}</Text>
      </Flex>
      <div className="mt20 ml40">
        <div className={styles.greyRow} />
        <div className={cx(styles.purpleRow, 'mt20')} />
        <div className={cx(styles.lightGreyBold, 'mt40')} />
        {[112, 112, 112, 112, 112, 112, 52].map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className={styles.lightGrey} style={{ width: item }} />
        ))}
      </div>
    </Flex>
    <Flex className="mt20">
      {[1, 2, 3].map(item => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={item} className="mr10">
          <div className={styles.lightGrey} style={{ width: 10 }} />
          <div className={styles.lightGrey} style={{ width: 38 }} />
        </div>
      ))}
    </Flex>
  </div>
);

Light.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
};

export default Light;
