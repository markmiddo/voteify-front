import { Modal, Text } from 'components/ui';
import { Button } from 'components/ui/Button';
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from '../styles.scss';

const LimitPopup = ({
  count, limit, cancel, color,
}) => (
  <Modal cancel={cancel} className={cx(styles.limitModal, 'text-center')}>
    <Text black className={styles.fs18}>{`You must select at least ${limit + 1} songs`}</Text>
    <Text size="md" className={cx(styles.choosed, 'mt5')}>{`You've only selected ${count}`}</Text>
    <Button onClick={cancel} className={cx(color, 'mt40')}>got it!</Button>
  </Modal>
);

LimitPopup.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cancel: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default LimitPopup;
