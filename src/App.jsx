// filepath: d:\ALBAR\BACKUPP\Development\igamerworld\frontend\src\App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import HomePage from './pages/Customer/HomePage';
import Catalog from './pages/Customer/Catalog';

const App = () => {
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </>
    );
};

export default App;