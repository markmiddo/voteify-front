import UploadImageModal from 'components/form/upload-image/Modal';
import { Button } from 'components/ui/Button';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import styles from './styles.scss';

export class UploadImage extends Component {
  state = {
    isOpenModal: false,
  }

  toggleModal = () => this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));

  render() {
    const {
      label, inline, full, className, input, meta, ...rest
    } = this.props;
    const { isOpenModal } = this.state;
    return (
      <>
        <div className={cx(styles.container, {
          'd-inline-block': inline,
          'full-width': full,
          mr10: inline,
        }, className)}
        >
          {label}
          <Button type="primary" onClick={this.toggleModal}>Upload</Button>
          <span className={cx(styles.loaded, { [styles.visible]: Boolean(input.value) })}>
            Image loaded
          </span>
          <div className={styles.info}>
            <span className={cx(styles.text, { [styles.visible]: meta.touched && meta.error })}>
              {meta.touched && meta.error}
            </span>
          </div>
        </div>
        {isOpenModal && (
          <UploadImageModal cancel={this.toggleModal} input={input} {...rest} />
        )}
      </>
    );
  }
}

UploadImage.propTypes = {
  label: PropTypes.node,
  inline: PropTypes.bool,
  full: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
};
