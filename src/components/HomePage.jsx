// src/components/HomePage.jsx
import React from 'react';
import VideoBackground from './VideoBackground';
//import './HomePage.css'; // Si vous avez un CSS spécifique

function HomePage() {
  return (
    <VideoBackground 
      videoSrc="/background-video.mp4" // Chemin depuis le dossier public
      overlayOpacity={0.3}
    >
      <h1>Bienvenue</h1>
      <p>Découvrez notre univers</p>
      <button>Explorer</button>
    </VideoBackground>
  );
}

export default HomePage;