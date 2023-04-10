import { Button } from 'components/ui/Button';
import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class FileInputComponent extends Component {
  render() {
    const {
      inline, full, error, className, value: _, onChange, onBlur, ...rest
    } = this.props;
    return (
      <>
        <input
          className={cx(styles.input, {
            'd-inline-block': inline,
            'full-width': full,
            [styles.error]: error,
          }, className)}
          ref={(el) => { this.fileInputRef = el; }}
          type="file"
          accept="text/csv"
          hidden
          onClick={() => onBlur()}
          onChange={({ target }) => onChange(target.files[0])}
          {...rest}
        />
        <Button type="primary" onClick={() => this.fileInputRef.click()}>Upload</Button>
      </>
    );
  }
}

FileInputComponent.propTypes = {
  inline: PropTypes.bool,
  full: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
};

export default FileInputComponent;
