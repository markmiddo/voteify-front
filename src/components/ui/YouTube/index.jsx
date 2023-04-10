import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const YouTube = ({
  video, autoplay, rel, modest,
}) => {
  const videoSrc = `https://www.youtube.com/embed/${
    video}?autoplay=${
    autoplay}&rel=${
    rel}&modestbranding=${
    modest}`;
  return (
    <div className={styles.youtube}>
      <iframe
        title="YouTube"
        className="player"
        type="text/html"
        width="100%"
        height="100%"
        src={videoSrc}
        frameBorder="0"
      />
    </div>
  );
};

YouTube.propTypes = {
  video: PropTypes.string.isRequired,
  autoplay: PropTypes.string.isRequired,
  rel: PropTypes.string.isRequired,
  modest: PropTypes.string.isRequired,
};
