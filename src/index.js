import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import SessionTimeout from './service/SessionTimeoutService';

import Home from "./views/home";
import Login from "./views/login";
import Profil from "./views/profile";
import CreateArticleForm from "./views/article/add";
import CreateCategorieForm from "./views/categorie/add";
import ArticleDetail from "./views/article/detail";
import CreateArticleEditOrDelete from "./views/article/edit";
import ImageUpload from "./views/image";
import LostPassword from "./views/login/forgetPassword";
import ChangePassword from "./views/login/newPassword";
import CreateUtilisateurForm from "./views/utilisateur/gestionUtilisateurAdmin";
import NotFound from "./views/notfound";

function App() {

    return (
        <BrowserRouter>
            <SessionTimeout />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/image" element={<ImageUpload />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/article/:id/edit_or_delete" element={<CreateArticleEditOrDelete />} />
                <Route path="/article/add" element={<CreateArticleForm />} />
                <Route path="/categorie/gestion" element={<CreateCategorieForm />} />
                <Route path="/admin/gestionUser" element={<CreateUtilisateurForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil/:param" element={<Profil />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/lost-password" element={<LostPassword />} />
                <Route path="/change-password/:token" element={<ChangePassword />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
