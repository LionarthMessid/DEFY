import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AlgoTrading from './pages/AlgoTrading';
import Investment from './pages/Investment';
import BasketDetails from './pages/BasketDetails';
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/algo-trading" element={<AlgoTrading />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/basket/:id" element={<BasketDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/algo-trading" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;