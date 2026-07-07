import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './MainDisplay.css';

// Premium Top-Down Carrom Striker SVG
const CarromStriker = ({ isLit }) => (
  <svg viewBox="0 0 100 100" className={`striker-svg ${isLit ? 'is-active' : ''}`}>
    <defs>
      {/* Glossy Acrylic Material */}
      <radialGradient id="acrylic" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="15%" stopColor="#f5f5f5" />
        <stop offset="70%" stopColor="#d4d4d4" />
        <stop offset="100%" stopColor="#999999" />
      </radialGradient>
      
      {/* Active Tournament Neon Glow inside the striker */}
      <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00ffcc" />
        <stop offset="60%" stopColor="#00b3ff" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Drop Shadow for Depth */}
    <circle cx="52" cy="55" r="44" fill="rgba(0,0,0,0.6)" filter="blur(5px)" className="striker-shadow" />

    {/* Base Acrylic Body */}
    <circle cx="50" cy="50" r="45" fill="url(#acrylic)" stroke="#555" strokeWidth="1"/>

    {/* Active Glow Overlay (Only visible when Lit) */}
    {isLit && <circle cx="50" cy="50" r="45" fill="url(#neonGlow)" opacity="0.6" />}

    {/* Traditional Carrom Concentric Rings */}
    <circle cx="50" cy="50" r="36" fill="none" stroke="#222" strokeWidth="2.5" opacity="0.8"/>
    <circle cx="50" cy="50" r="28" fill="none" stroke={isLit ? "#fff" : "#d32f2f"} strokeWidth="4" className="color-ring"/>
    <circle cx="50" cy="50" r="21" fill="none" stroke="#222" strokeWidth="1.5" opacity="0.8"/>

    {/* Center Compass / Star Pattern */}
    <path 
      d="M50 15 L55 42 L82 50 L55 58 L50 85 L45 58 L18 50 L45 42 Z" 
      fill={isLit ? "#fff" : "#111"} 
      className="center-star"
    />
    <circle cx="50" cy="50" r="9" fill={isLit ? "#00ffcc" : "#d32f2f"} />
    <circle cx="50" cy="50" r="3" fill="#fff" />
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
      {/* Carrom Board Surface Background */}
      <div className="board-texture"></div>
      <div className="board-lines"></div>
      
      <div className="branding-header">
        <h1>CARROM CHAMPIONSHIP 2026</h1>
        <h2>OFFICIAL OPENING CEREMONY</h2>
      </div>
      
      <div className="ceremony-stage">
        <div className="strikers-wrapper">
          {lamps.map((isLit, index) => (
            <div key={index} className="striker-station">
              
              {/* Carrom Powder (Boric Acid) Particle Effect */}
              <div className="powder-area">
                {isLit && (
                  <>
                    <div className="powder-particle p1"></div>
                    <div className="powder-particle p2"></div>
                    <div className="powder-particle p3"></div>
                    <div className="powder-particle p4"></div>
                    <div className="powder-particle p5"></div>
                  </>
                )}
              </div>

              <CarromStriker isLit={isLit} />
              
              <div className={`station-label ${isLit ? 'label-lit' : ''}`}>
                STRIKER {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;