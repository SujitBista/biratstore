import React from 'react';
import Dashboard from './component/Dashboard';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/products/category" element={<Dashboard />} />
        <Route path="/products/product" element={<Dashboard />} />
        <Route path="/products/sale" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
