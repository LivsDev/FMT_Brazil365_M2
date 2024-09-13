import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Importe o componente Login
import Dashboard from './pages/Dashboard'; // Página de dashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Rota para o Dashboard */}
      </Routes>
    </Router>
  );
};

export default App;
