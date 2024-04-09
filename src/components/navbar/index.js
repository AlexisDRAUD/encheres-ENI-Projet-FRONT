import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UtilisateurService from "../../service/utilisateurService";
import { Link } from 'react-router-dom';
import authService from "../../service/auth-service";
const Utilisateur = await UtilisateurService.getUtilisateurById()

const logout = (event) => {
    authService.logout();
};
const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ENI-Encheres
                </Typography>
                <Link to={`/profil`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                    Mon profil
                </Typography>
                </Link>
                <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={logout}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Déconnexion
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
