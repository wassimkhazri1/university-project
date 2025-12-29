// src/components/VideoBackground.jsx
import React, { useState, useEffect } from 'react';
import './VideoBackground.css';

const VideoBackground = ({ 
  videoSrc, 
  children, 
  overlayOpacity = 0.5,
  fallbackImage = null, // Image de fallback optionnelle
  className = '',
  contentClassName = ''
}) => {
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecter si on est sur mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleVideoError = () => {
    console.error('Erreur de chargement de la vidéo:', videoSrc);
    setVideoError(true);
  };

  return (
    <div className={`video-container ${className} ${isMobile ? 'mobile' : ''}`}>
      {!videoError ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
      ) : fallbackImage ? (
        <img 
          src={fallbackImage} 
          alt="Background fallback" 
          className="background-fallback"
        />
      ) : (
        <div className="solid-background" />
      )}
      
      <div 
        className="video-overlay" 
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      
      <div className={`video-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;