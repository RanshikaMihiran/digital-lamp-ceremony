import React, { useEffect, useState } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../../firebase';
import './TabletPanel.css';

const TabletPanel = () => {
  const [lamps, setLamps] = useState([false, false, false, false, false]);

  useEffect(() => {
    const lampsRef = ref(db, 'lamps');
    const unsubscribe = onValue(lampsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLamps(data);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = (index) => {
    const updatedLamps = [...lamps];
    updatedLamps[index] = !updatedLamps[index];
    set(ref(db, 'lamps'), updatedLamps);
  };

  const activeCount = lamps.filter(Boolean).length;

  return (
    <div className="modern-tablet-ui">
      {/* Dynamic Background Mesh */}
      <div className="cyber-mesh-bg"></div>
      
      <div className="glassmorphism-dashboard">
        
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <div className={`status-indicator ${activeCount > 0 ? 'status-live' : 'status-standby'}`}></div>
            <div className="sys-text">
              <h2>HCB COMMAND CENTER</h2>
              <p>SYSTEM {activeCount > 0 ? 'ENGAGED' : 'STANDBY'}</p>
            </div>
          </div>
          <div className="header-right">
            <div className="progress-text">{activeCount} / 5 ARMED</div>
          </div>
        </div>

        <div className="divider-line"></div>

        {/* Futuristic Tactile Buttons */}
        <div className="controls-array">
          {lamps.map((isActive, index) => (
            <div key={index} className="tactile-module">
              <button 
                className={`cyber-ring-btn ${isActive ? 'btn-active' : ''}`}
                onClick={() => handleToggle(index)}
              >
                <div className="inner-bezel">
                  <div className="core-button">
                    <span className="power-icon">⏻</span>
                  </div>
                </div>
              </button>
              <div className="module-data">
                <span className="mod-title">MODULE 0{index + 1}</span>
                <span className={`mod-status ${isActive ? 'text-active' : ''}`}>
                  {isActive ? 'IGNITED' : 'LOCKED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabletPanel;