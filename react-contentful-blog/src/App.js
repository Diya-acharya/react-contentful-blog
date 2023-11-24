import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import BlogDetail from './BlogDetail';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
