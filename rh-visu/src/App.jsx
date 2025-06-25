import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Accueil from './pages/Accueil';
import Employes from './pages/Employes';
import Candidats from './pages/Candidats';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="p-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/employes" element={<Employes />} />
            <Route path="/candidats" element={<Candidats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;