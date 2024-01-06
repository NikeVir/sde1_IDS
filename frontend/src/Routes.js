// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminDashboard from './admin/pages/AdminDashboard';
import AdminLogin from './admin/pages/AdminLogin';
import AdminRegister from './admin/pages/AdminRegister';
import UserLogin from './user/pages/UserLogin';
import UserRegister from './user/pages/UserRegister';
import UserDashboard from './user/pages/UserDashboard';
const PagesRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" exact element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* User Routes */}
        <Route path="/user/dashboard"  element={<UserDashboard />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        {/* Add more routes as needed */}

        {/* Default Route (404) */}
        {/* <Route path="/" element={() => <div>404 Not Found</div>} /> */}
      </Routes>
    </Router>
  );
};

export default PagesRoutes;
