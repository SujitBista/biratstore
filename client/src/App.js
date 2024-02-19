import React from 'react';
import Dashboard from './component/Dashboard';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/products/category" element={<Dashboard />} />
          <Route path="/products/product" element={<Dashboard />} />
          <Route path="/products/sale" element={<Dashboard />} />
          <Route path="/settings/units" element= {<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
