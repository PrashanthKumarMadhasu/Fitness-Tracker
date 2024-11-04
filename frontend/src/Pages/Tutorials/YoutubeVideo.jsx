import React from 'react';
import './YoutubeVideo.css';

const YoutubeVideo = ({ url }) => {
  return (
    <div className="youtube-embed-wrapper">
      <iframe
        width="202"
        height="352"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

export default YoutubeVideo;
