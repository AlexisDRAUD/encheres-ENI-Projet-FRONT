import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from "./views/home";
import Login from "./views/login";
import Profil from "./views/profile";
import CreateArticleForm from "./views/article/add";
import CreateCategorieForm from "./views/categorie/add";
import ArticleDetail from "./views/article/detail";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/article/add" element={<CreateArticleForm />} />
                <Route path="/categorie/gestion" element={<CreateCategorieForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil/:param" element={<Profil />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
