import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './MainDisplay.css';

const OrnateTraditionalLamp = ({ isLit }) => (
  <div className="lamp-wrapper">
    {/* Majestic CSS Flame, Aura, and Sparks */}
    <div className="flame-container">
      {isLit && (
        <>
          <div className="flame-halo"></div>
          <div className="flame-aura"></div>
          <div className="flame-core"></div>
          <div className="sparks-container">
            <div className="spark s1"></div>
            <div className="spark s2"></div>
            <div className="spark s3"></div>
            <div className="spark s4"></div>
            <div className="spark s5"></div>
          </div>
        </>
      )}
    </div>

    {/* Highly Detailed Traditional Brass Pahana SVG */}
    <svg viewBox="0 0 120 250" className="lamp-svg">
      <defs>
        <linearGradient id="antiqueBrass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2c1e09" />
          <stop offset="25%" stopColor="#b8860b" />
          <stop offset="50%" stopColor="#ffdf00" />
          <stop offset="75%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#2c1e09" />
        </linearGradient>
        <radialGradient id="brassShine" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffeeaa" />
          <stop offset="100%" stopColor="#996600" />
        </radialGradient>
      </defs>
      
      {/* Three-Tiered Base */}
      <polygon points="20,240 100,240 85,220 35,220" fill="url(#antiqueBrass)" />
      <polygon points="30,220 90,220 75,200 45,200" fill="url(#antiqueBrass)" />
      <rect x="15" y="240" width="90" height="6" fill="#1a1104" />
      
      {/* Central Fluted Pillar */}
      <rect x="52" y="90" width="16" height="110" fill="url(#antiqueBrass)" />
      
      {/* Decorative Pillar Rings */}
      <ellipse cx="60" cy="180" rx="16" ry="6" fill="url(#brassShine)" />
      <ellipse cx="60" cy="140" rx="14" ry="5" fill="url(#brassShine)" />
      <ellipse cx="60" cy="100" rx="12" ry="4" fill="url(#brassShine)" />
      
      {/* Ornate Oil Tray (The Flower/Petal design) */}
      <path d="M 25,85 Q 60,110 95,85 Q 60,95 25,85 Z" fill="url(#antiqueBrass)" />
      <ellipse cx="60" cy="85" rx="35" ry="8" fill="#1a1104" />
      
      {/* Hanging Brass Petals (Traditional Detail) */}
      <polygon points="25,85 30,100 35,88" fill="url(#antiqueBrass)" />
      <polygon points="95,85 90,100 85,88" fill="url(#antiqueBrass)" />
      
      {/* Top Pinnacle (Koththa) */}
      <polygon points="50,85 70,85 65,50 55,50" fill="url(#antiqueBrass)" />
      <polygon points="55,50 65,50 60,20" fill="url(#antiqueBrass)" />
      
      {/* Wick */}
      <path d="M 58,20 Q 65,10 60,5" fill="none" stroke="#111" strokeWidth="2" />
    </svg>
  </div>
);

const MainDisplay = () => {
  const [lamps, setLamps] = useState([false, false, false, false, false]);
  const audioRef = useRef(null);
  const hasPlayedAudio = useRef(false);

  useEffect(() => {
    const lampsRef = ref(db, 'lamps');
    const unsubscribe = onValue(lampsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLamps(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const isAnyLit = lamps.some((lamp) => lamp);
    if (isAnyLit && !hasPlayedAudio.current && audioRef.current) {
      hasPlayedAudio.current = true;
      const audio = audioRef.current;
      audio.volume = 0;
      audio.play().catch(e => console.log(e));

      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        if (vol >= 1) {
          audio.volume = 1;
          clearInterval(fade);
        } else {
          audio.volume = vol;
        }
      }, 150);
    }
  }, [lamps]);

  return (
    <div className="hcb-traditional-display">
      <audio ref={audioRef} src="/magul-bera.mp3" loop preload="auto" />

      {/* Traditional Lighting & Overlays */}
      <div className="liyavela-overlay"></div>
      <div className="stage-spotlight" style={{ opacity: 0.2 + (lamps.filter(Boolean).length * 0.15) }}></div>

      <header className="traditional-header">
        <h1 className="hcb-logo">HCB</h1>
        <div className="royal-divider">
          <div className="line"></div>
          <div className="gem"></div>
          <div className="line"></div>
        </div>
        <h2 className="event-subtitle">CARROM 2026</h2>
      </header>

      <div className="stage-area">
        <div className="lamps-grid">
          {lamps.map((isLit, index) => (
            <div key={index} className="lamp-station">
              <OrnateTraditionalLamp isLit={isLit} />
              <div className={`lamp-label ${isLit ? 'label-glow' : ''}`}>
                LAMP 0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;