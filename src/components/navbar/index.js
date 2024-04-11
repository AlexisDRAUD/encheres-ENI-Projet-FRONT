import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AuthService from "../../service/auth-service";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [IsAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setIsLoggedIn(user !== null);
        setIsAdmin((user && user.admin) ? user.admin : '',)
    }, [sessionStorage.getItem('user')]);

    const logout = () => {
        AuthService.logout();
        sessionStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.reload()
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="h6" component={Link} to={`/`}>
                    ENI-Encheres
                </Button>
                <div>
                    {isLoggedIn ? (
                        <>
                            {IsAdmin ? (
                                <>
                                    <Button color="inherit" component={Link} to={`/categorie/gestion`}>
                                        Gérer les catégories
                                    </Button>
                                </>
                            ) : (
                                <></>
                            )}
                            <Button color="inherit" component={Link} to={`/article/add`}>
                                Vendre un article
                            </Button>
                            <Button color="inherit" component={Link} to={`/profil`}>
                                Mon profil
                            </Button>
                            <Button color="inherit" component={Link} to={`/`} onClick={logout}>
                                Déconnexion
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to={`/login`}>
                            Connexion / Enregistrer
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
