import { RangeInput } from 'components/form/range-input';
import { Button } from 'components/ui/Button';
import { Modal } from 'components/ui/Modal';
import { Title } from 'components/ui/Title';
import { createStructuredSelector } from 'reselect';
import I from 'immutable';
import { envInstanceSelector, updateProfileAction } from 'domain/env';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AvatarEditor from 'react-avatar-editor';
import styles from './styles.scss';

class ReplaceImage extends PureComponent {
  state = {
    image: null,
    scale: 1,
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  }

  handleScale = ({ target }) => this.setState({ scale: parseFloat(target.value) })

  handleNewImage = ({ target }) => this.setState({ image: target.files[0] })

  handleRemoveImage = () => this.setState({ image: null })

  handleSave = () => {
    const img = this.editor.getImageScaledToCanvas();
    const { updateProfile, user, cancel } = this.props;
    img.toBlob(
      (blob) => {
        const formData = new FormData();
        formData.append('resource[avatar]', blob, `avatar-${Date.now()}.jpeg`);
        updateProfile({ data: formData, id: user.get('id') });
        cancel();
      },
      'image/jpeg',
    );
  }

  render() {
    const { cancel } = this.props;
    const { image, scale } = this.state;
    return (
      <Modal cancel={cancel} className={styles.root}>
        <Title className={styles.title}>Update Your Profile Photo</Title>
        {image && (
        <div className="text-center">
          <AvatarEditor
            ref={this.setEditorRef}
            image={image}
            width={200}
            height={200}
            borderRadius={100}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            crossOrigin=""
          />
        </div>)}
        <input
          ref={(el) => { this.fileInputRef = el; }}
          name="newImage"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={this.handleNewImage}
          hidden
        />
        {!image && (
        <div className="text-center mt40 mb40">
          <Button type="primary" onClick={() => this.fileInputRef.click()}>upload</Button>
        </div>
        )}
        {image && (
        <>
          <RangeInput
            label="zoom:"
            inputProps={{
              name: 'scale',
              type: 'range',
              min: '1',
              max: '2',
              step: '0.01',
              defaultValue: '1',
              onChange: this.handleScale,
            }}
            className="mb40"
          />
          <div className="text-right">
            <Button type="primary" onClick={this.handleRemoveImage} className="mr20">reset</Button>
            <Button onClick={this.handleSave}>save</Button>
          </div>
        </>
        )}
      </Modal>
    );
  }
}

ReplaceImage.propTypes = {
  cancel: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(I.Map).isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: envInstanceSelector,
});

const mapDispatchToProps = {
  updateProfile: updateProfileAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ReplaceImage);
