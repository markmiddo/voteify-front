/* eslint-disable react/destructuring-assignment */
import cx from 'classnames';
import { Modal, Title, Button } from 'components/ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import styles from './styles.scss';

export default class UploadImageModal extends Component {
  state = {
    image: null,
    sizeError: null,
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  }

  handleNewImage = ({ target }) => {
    const imageFile = target.files[0];
    const img = new Image();

    if (imageFile) {
      img.src = window.URL.createObjectURL(imageFile);

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width >= this.props.width && height >= this.props.height) {
          this.setState({ image: imageFile });
        } else {
          this.setState({
            sizeError: `Size of image too small. Your size: 
            ${width}x${height} px, Need: 
            ${this.props.width}x${this.props.height} px`,
          });
        }
      };
    }
  }

  handleRemoveImage = () => this.setState({ image: null })

  handleSave = () => {
    const img = this.editor.getImageScaledToCanvas();
    const { cancel, input } = this.props;
    img.toBlob(
      (blob) => {
        input.onChange(blob);
        cancel();
      },
      'image/jpeg',
    );
  }

  handleUpload = () => {
    this.fileInputRef.click();
  }

  render() {
    const {
      cancel, width, height, input,
    } = this.props;
    const { image, sizeError } = this.state;
    return (
      <Modal cancel={cancel} className={styles.root}>
        <Title className={styles.title}>Upload image</Title>
        {image && (
          <div className="text-center">
            <AvatarEditor
              ref={this.setEditorRef}
              image={image}
              width={width}
              height={height}
              color={[255, 255, 255, 0.6]}
              crossOrigin=""
            />
          </div>
        )}
        <input
          ref={(el) => { this.fileInputRef = el; }}
          name="newImage"
          type="file"
          accept=".png, .jpg, .jpeg"
          onClick={() => input.onBlur()}
          onChange={this.handleNewImage}
          hidden
        />
        {!image && (
          <div className="text-center mt40 mb40">
            <Button type="primary" onClick={this.handleUpload}>upload</Button>
          </div>
        )}
        {image && (
          <div className="text-right">
            <Button type="primary" onClick={this.handleRemoveImage} className="mr20">reset</Button>
            <Button onClick={this.handleSave}>save</Button>
          </div>
        )}
        <div className={styles.info}>
          <span className={cx(styles.text, { [styles.visible]: sizeError })}>
            {sizeError}
          </span>
        </div>
      </Modal>
    );
  }
}

UploadImageModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }),
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
};

UploadImageModal.defaultProps = {
  width: 500,
  height: 700,
};
