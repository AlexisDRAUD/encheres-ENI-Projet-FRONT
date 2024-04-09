import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from "./components/navbar";
import Home from "./views/home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./views/login";
import Profil from "./views/profile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profil" element={<Profil/>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
