import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import LoginFrame from './components/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route redirects to /login */}
          <Route path="/" element={<LoginFrame />} />
          {/* Route for Login */}
          <Route path="/login" element={<LoginFrame />} />
          {/* Route for Register */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
