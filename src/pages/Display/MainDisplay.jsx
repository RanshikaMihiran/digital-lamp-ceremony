import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './MainDisplay.css';

// Masterful SVG Component for a Royal Sri Lankan Multi-Tiered Brass Lamp
const RoyalTraditionalLamp = ({ isLit }) => (
  <svg viewBox="0 0 160 260" className={`royal-lamp-svg ${isLit ? 'lamp-active' : ''}`}>
    <defs>
      {/* Rich Polished Brass Metallic Gradients */}
      <linearGradient id="royalBrass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4a320c" />
        <stop offset="25%" stopColor="#d4af37" />
        <stop offset="50%" stopColor="#fff3a8" />
        <stop offset="75%" stopColor="#b8860b" />
        <stop offset="100%" stopColor="#302006" />
      </linearGradient>
      
      <linearGradient id="shadowBrass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#211503" />
        <stop offset="100%" stopColor="#5c4214" />
      </linearGradient>

      {/* Realistic Volumetric Flame Gradient */}
      <radialGradient id="traditionalFlame" cx="50%" cy="90%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#ffdf6d" />
        <stop offset="60%" stopColor="#ff5100" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Table/Stand Shadow */}
    <ellipse cx="80" cy="245" rx="40" ry="8" fill="rgba(0,0,0,0.7)" filter="blur(5px)" />

    {/* STEP 1: Main Molded Base Pedestal */}
    <path d="M 50 235 Q 80 215 110 235 L 115 245 L 45 245 Z" fill="url(#royalBrass)" />
    <ellipse cx="80" cy="235" rx="30" ry="6" fill="url(#shadowBrass)" />

    {/* STEP 2: Main Vertical Fluted Stem (Central Pillar) */}
    <rect x="74" y="60" width="12" height="175" fill="url(#royalBrass)" />
    {/* Traditional Decorative Rings (Molding decorative bands) */}
    <ellipse cx="80" cy="205" rx="10" ry="4" fill="url(#royalBrass)" stroke="#3a2407" strokeWidth="0.5" />
    <ellipse cx="80" cy="165" rx="9" ry="4" fill="url(#royalBrass)" stroke="#3a2407" strokeWidth="0.5" />
    <ellipse cx="80" cy="115" rx="8" ry="3.5" fill="url(#royalBrass)" stroke="#3a2407" strokeWidth="0.5" />

    {/* STEP 3: Ornate Side Branches (Traditional Arcs inspired by image 1) */}
    {/* Left Branch */}
    <path d="M 74 150 Q 40 155 35 120 Q 30 95 45 105 Q 40 115 50 120 Q 60 120 74 135" fill="none" stroke="url(#royalBrass)" strokeWidth="5" strokeLinecap="round" />
    {/* Right Branch */}
    <path d="M 86 150 Q 120 155 125 120 Q 130 95 115 105 Q 120 115 110 120 Q 100 120 86 135" fill="none" stroke="url(#royalBrass)" strokeWidth="5" strokeLinecap="round" />

    {/* STEP 4: Secondary Oil Bowls on Branches */}
    {/* Left Bowl */}
    <path d="M 30 105 Q 45 115 60 105 Q 45 125 30 105 Z" fill="url(#royalBrass)" />
    <ellipse cx="45" cy="105" rx="15" ry="4" fill="url(#shadowBrass)" />
    <path d="M 43 103 L 47 103 L 45 95 Z" fill="#222" /> {/* Wick */}

    {/* Right Bowl */}
    <path d="M 100 105 Q 115 115 130 105 Q 115 125 100 105 Z" fill="url(#royalBrass)" />
    <ellipse cx="115" cy="105" rx="15" ry="4" fill="url(#shadowBrass)" />
    <path d="M 113 103 L 117 103 L 115 95 Z" fill="#222" /> {/* Wick */}

    {/* STEP 5: Crown Top Oil Basin (Main Reservoir) */}
    <path d="M 45 60 Q 80 75 115 60 Q 80 95 45 60 Z" fill="url(#royalBrass)" />
    <ellipse cx="80" cy="60" rx="35" ry="8" fill="url(#shadowBrass)" />
    
    {/* Decorative Spire Tip (The Pinnacle / Koththa) */}
    <path d="M 72 55 Q 80 15 80 5 Q 80 15 88 55 Q 80 58 72 55 Z" fill="url(#royalBrass)" />
    <ellipse cx="80" cy="45" rx="6" ry="3" fill="url(#royalBrass)" />

    {/* STEP 6: Center Main Wick */}
    <path d="M 77 56 L 83 56 L 80 44 Z" fill="#111" />

    {/* STEP 7: Interactive Master Flames (Ignites synchronously when activated) */}
    {isLit && (
      <g className="royal-flames-group">
        {/* Main Center Flame */}
        <path d="M 70 44 Q 80 5 80 0 Q 80 5 90 44 Q 80 52 70 44 Z" fill="url(#traditionalFlame)" className="master-flame" />
        <circle cx="80" cy="35" r="3" fill="#ffffff" filter="blur(1px)" />

        {/* Left Branch Flame */}
        <path d="M 38 95 Q 45 70 45 65 Q 45 70 52 95 Q 45 100 38 95 Z" fill="url(#traditionalFlame)" className="sub-flame lf" />
        
        {/* Right Branch Flame */}
        <path d="M 108 95 Q 115 70 115 65 Q 115 70 122 95 Q 115 100 108 95 Z" fill="url(#traditionalFlame)" className="sub-flame rf" />
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
    <div className="ceremony-container">
      {/* Traditional Intricate Background Linework Overlay */}
      <div className="traditional-pattern-overlay"></div>
      <div className="golden-soft-glow"></div>
      
      <div className="branding-wrapper">
        <h1 className="main-title">HCB</h1>
        <div className="title-divider">
          <span className="line"></span>
          <span className="diamond">♦</span>
          <span className="line"></span>
        </div>
        <h2 className="sub-title">Carrom 2026</h2>
      </div>
      
      <div className="display-stage">
        {/* Elegant Flower Garland Presentation Platform Base */}
        <div className="festive-floral-base"></div>
        <div className="lamps-alignment-grid">
          {lamps.map((isLit, index) => (
            <div key={index} className={`lamp-pillar-station ${isLit ? 'is-ignited' : ''}`}>
              
              {/* Dynamic Aura Glow Behind the Lamp Base */}
              <div className="lamp-aura-glow"></div>

              <RoyalTraditionalLamp isLit={isLit} />
              
              <div className="lamp-caption">
                <span className="gold-text">LAMP 0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;