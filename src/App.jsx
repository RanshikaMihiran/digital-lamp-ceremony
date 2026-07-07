import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainDisplay from './pages/Display/MainDisplay';
import TabletPanel from './pages/Tablet/TabletPanel';
import { initializeLamps } from './firebase';

function App() {
  useEffect(() => {
    initializeLamps();
  }, []);

  return (
    <Router>
      <Routes>
        {/* This new line instantly redirects the blank "/" URL to the "/tablet" URL */}
        <Route path="/" element={<Navigate to="/tablet" replace />} />
        
        <Route path="/display" element={<MainDisplay />} />
        <Route path="/tablet" element={<TabletPanel />} />
      </Routes>
    </Router>
  );
}

export default App;