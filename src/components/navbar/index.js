import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    Chip,
    SvgIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AuthService from "../../service/auth-service";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import UtilisateurService from "../../service/utilisateurService";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [utilisateur, setutilisateur] = useState({});

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setIsLoggedIn(user !== null);
        setIsAdmin(user && user.admin);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await UtilisateurService.getUtilisateurById();
            setutilisateur(userData);
        };
        fetchUser();
    }, []);

    const logout = () => {
        AuthService.logout();
        sessionStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.reload();
        window.location.replace("/")
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawer = (
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
        >
            <List>
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <ListItem button component={Link} to="/categorie/gestion">
                                <ListItemText primary="Gérer les catégories" />
                            </ListItem>
                        )}
                        <ListItem button component={Link} to="/article/add">
                            <ListItemText primary="Vendre un article" />
                        </ListItem>
                        <ListItem button component={Link} to="/profil">
                            <ListItemText primary="Mon profil" />
                        </ListItem>
                        <ListItem button component={Link} to="/" onClick={logout}>
                            <ListItemText primary="Déconnexion" />
                        </ListItem>
                        <ListItem>
                            <Chip icon={<CurrencyBitcoinIcon/>} label={utilisateur.credit} />
                        </ListItem>
                    </>
                ) : (
                    <ListItem button component={Link} to="/login">
                        <ListItemText primary="Connexion / Enregistrer" />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={toggleDrawer(true)}
                    sx={{ mr: 2, display: isMobile ? 'block' : 'none' }}
                >
                    <MenuIcon />
                </IconButton>
                <Button variant="h6" component={Link} to="/">
                    ENI-Encheres
                </Button>
                {!isMobile && (
                    <div>
                        {isLoggedIn ? (
                            <>
                                {isAdmin && (
                                    <Button color="inherit" component={Link} to="/categorie/gestion">
                                        Gérer les catégories
                                    </Button>
                                )}
                                <Button color="inherit" component={Link} to="/article/add">
                                    Vendre un article
                                </Button>
                                <Button color="inherit" component={Link} to="/profil">
                                    Mon profil
                                </Button>
                                <Button color="inherit" component={Link} to="/" onClick={logout}>
                                    Déconnexion
                                </Button>
                                <Chip icon={<CurrencyBitcoinIcon/>} label={utilisateur.credit} />
                            </>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">
                                Connexion / Enregistrer
                            </Button>
                        )}
                    </div>
                )}
            </Toolbar>
            {isMobile && drawer}
        </AppBar>
    );
};

export default Navbar;
