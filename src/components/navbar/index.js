import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AuthService from "../../service/auth-service";

const logout = () => {
    AuthService.logout();
    sessionStorage.removeItem("user");
};

const Navbar = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    {user ? (<Link to="/">ENI-Encheres</Link>)
                        : <>ENI-Encheres</>}
                </Typography>
                <div>
                    {user ? (
                        <>
                            <Button color="inherit" component={Link} to={`/categorie/gestion`}>
                                Gérer les catégories
                            </Button>
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
