import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './MainDisplay.css';

// Hyper-Realistic SVG Component
const RealisticJoint = ({ isLit }) => (
  <svg viewBox="0 0 100 260" className={`joint-svg ${isLit ? 'is-burning' : ''}`}>
    <defs>
      {/* 3D Shading for the white rolling paper */}
      <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#bfbfbf" />
        <stop offset="20%" stopColor="#f8f8f8" />
        <stop offset="80%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#8c8c8c" />
      </linearGradient>

      {/* Shading for the cardboard filter */}
      <linearGradient id="filterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8f7a63" />
        <stop offset="40%" stopColor="#d1bfae" />
        <stop offset="100%" stopColor="#5e4c3a" />
      </linearGradient>

      {/* The intense burning ember core */}
      <radialGradient id="cherryGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#ffea00" />
        <stop offset="60%" stopColor="#ff2a00" />
        <stop offset="90%" stopColor="#222222" />
        <stop offset="100%" stopColor="#111111" />
      </radialGradient>
    </defs>

    {/* Drop Shadow on the surface */}
    <ellipse cx="50" cy="245" rx="35" ry="10" fill="rgba(0,0,0,0.8)" filter="blur(6px)" />

    {/* Filter (Roach) - Narrow base */}
    <path d="M 40 190 L 60 190 L 57 240 L 43 240 Z" fill="url(#filterGrad)" />
    
    {/* Cardboard Roll Lines inside the filter */}
    <path d="M 44 190 L 46 240 M 50 190 L 50 240 M 56 190 L 54 240" stroke="#705e49" strokeWidth="1.5" opacity="0.7" />

    {/* Rolling Paper Body - Classic Cone Shape */}
    <path d="M 25 50 L 75 50 L 60 190 L 40 190 Z" fill="url(#paperGrad)" />

    {/* Diagonal Paper Creases/Folds for realism */}
    <path d="M 28 80 Q 50 95 72 75" stroke="#d4d4d4" strokeWidth="1.5" fill="none" opacity="0.9" />
    <path d="M 32 120 Q 50 105 68 130" stroke="#e0e0e0" strokeWidth="1" fill="none" />
    <path d="M 35 155 Q 50 165 64 150" stroke="#cccccc" strokeWidth="1.5" fill="none" opacity="0.7" />

    {/* Cold Ash Base (Always visible) */}
    <path d="M 25 50 Q 50 65 75 50 L 68 25 Q 50 15 32 25 Z" fill="#2a2a2a" />
    <path d="M 32 25 Q 50 15 68 25 L 62 10 Q 50 5 38 10 Z" fill="#4d4d4d" /> {/* Flaky top ash */}

    {/* Burning Ember (Only visible when toggled ON) */}
    {isLit && (
      <g className="active-cherry">
        {/* Main glow area wrapping the ash line */}
        <path d="M 24 48 Q 50 68 76 48 L 70 30 Q 50 15 30 30 Z" fill="url(#cherryGlow)" />
        
        {/* Hot spots to make it look like burning plant material */}
        <circle cx="40" cy="35" r="2" fill="#ffffff" opacity="0.9" />
        <circle cx="60" cy="42" r="1.5" fill="#ffea00" />
        <circle cx="50" cy="28" r="2.5" fill="#ffffff" />
        <circle cx="48" cy="48" r="1.5" fill="#ffea00" opacity="0.8" />
        <circle cx="32" cy="40" r="1" fill="#ffffff" />
      </g>
    )}
  </svg>
);

const MainDisplay = () => {
  const [lamps, setLamps] = useState([true, false, false, false, false]);

  useEffect(() => {
    const lampsRef = ref(db, 'lamps');
    const unsubscribe = onValue(lampsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLamps(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="display-container">
      <div className="ambient-glow"></div>
      
      <div className="branding-header">
        <h1>HCB 2025</h1>
        <h2>DIGITAL LIGHTING CEREMONY</h2>
      </div>
      
      <div className="ceremony-stage">
        <div className="modern-platform"></div>
        <div className="lamps-wrapper">
          {lamps.map((isLit, index) => (
            <div key={index} className="lamp-station">
              
              <div className="smoke-area">
                {isLit && (
                  <>
                    <div className="smoke-plume smoke-fast"></div>
                    <div className="smoke-plume smoke-slow"></div>
                    <div className="smoke-plume smoke-wide"></div>
                  </>
                )}
              </div>

              <RealisticJoint isLit={isLit} />
              
              <div className={`lamp-label ${isLit ? 'label-lit' : ''}`}>
                MODULE {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;