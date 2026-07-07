import React, { useEffect, useState } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../../firebase';
import './TabletPanel.css';

const TabletPanel = () => {
  const [lamps, setLamps] = useState([true, false, false, false, false]);

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

  return (
    <div className="tablet-wrapper">
      <div className="glass-panel">
        <div className="panel-header">
          <div className="status-dot"></div>
          <h3>SYSTEM CONTROLLER</h3>
        </div>
        
        <div className="control-grid">
          {lamps.map((isActive, index) => (
            <div key={index} className="module-wrapper">
              <button 
                className={`hw-button ${isActive ? 'is-active' : ''}`}
                onClick={() => handleToggle(index)}
              >
                <div className="hw-button-ring">
                  <div className="hw-button-core"></div>
                </div>
              </button>
              <span className={`module-label ${isActive ? 'label-on' : 'label-off'}`}>
                {isActive ? 'ON' : 'OFF'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabletPanel;