import React from 'react';
import desktopVideo from '../../videos/COW Desktop video.mp4';
import mobileVideo from '../../videos/COW Mobile video.mp4';
import './styles.css';

const Home = () => {
  return (
    <div className="video-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video video-desktop"
      >
        <source src={desktopVideo} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video video-mobile"
      >
        <source src={mobileVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
