import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerCheckout from './pages/CustomerCheckout';

function App() {
  return (
    <Routes>
      <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
