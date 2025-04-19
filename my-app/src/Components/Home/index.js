import React from 'react';
import desktopVideo from '../../videos/COW-1.mp4';
import mobileVideo from '../../videos/cow-Vertical.mp4';
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
