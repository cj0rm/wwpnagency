import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="pixel-loader"></div>
        <h1 className="loading-text">
          <span className="char">L</span>
          <span className="char">O</span>
          <span className="char">A</span>
          <span className="char">D</span>
          <span className="char">I</span>
          <span className="char">N</span>
          <span className="char">G</span>
          <span className="char">.</span>
          <span className="char">.</span>
          <span className="char">.</span>
        </h1>
        <p className="loading-subtext">Assembling Pixels...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 