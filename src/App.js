import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Details from './Details';
import Tav from './Tav';
import './App.css'; 

document.documentElement.setAttribute('dir', 'rtl');

const App = () => {
  return (
    <Router>
      {/* Navigation links */}

      <header style={headerStyle}>
        <h1 style={headerTitle}>בדיקת מידע</h1>
        <nav style={navStyle}>
        <Link to="/details" style={buttonStyle}>אודות רכב</Link>
        <Link to="/tav" style={buttonStyle}>בדיקת תו נכה</Link>
        </nav>
      </header>

      {/* Define Routes to render components based on URL */}
      <Routes>
        <Route path="/details" element={<Details />} />
        <Route path="/tav" element={<Tav />} />
      </Routes>
    </Router>
  );
};
const headerStyle = {
  position: 'sticky', // Stick the header to the top of the page
  top: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#4CAF50',
  padding: '15px 30px',
  color: '#fff',
  zIndex: '1000', // Ensure header stays on top of other content
};

const headerTitle = {
  fontSize: '24px',
  margin: '0',
};

const navStyle = {
  display: 'flex',
  gap: '15px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#fff',
  color: '#4CAF50',
  textDecoration: 'none',
  borderRadius: '5px',
  border: '1px solid #4CAF50',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#45a049',
  color: '#fff',
};

export default App;
