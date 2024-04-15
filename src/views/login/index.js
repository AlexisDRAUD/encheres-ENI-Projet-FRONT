import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
    Grid, useMediaQuery, useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import AuthService from '../../service/auth-service';
import Navbar from "../../components/navbar";

const Login = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [username, setUsername] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const rememberMeStatus = localStorage.getItem('rememberMe') === 'true';
        setRememberMe(rememberMeStatus);

        if (rememberMeStatus) {
            const savedUsername = localStorage.getItem('username');
            const savedPassword = localStorage.getItem('password');
            if (savedUsername && savedPassword) {
                setUsername(savedUsername);
                setMotDePasse(savedPassword);
            }
        }
    }, []);

    const login = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await AuthService.login(username, motDePasse);
            if (rememberMe) {
                // Store username and password in localStorage if checked
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('password', motDePasse);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
            window.location.reload();
            window.location.replace("/");
        } catch (error) {
            console.error('Erreur de connexion:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            {!isMobile && (
                <div style={{padding: '80px', display: 'flex', justifyContent: 'space-around'}}>
                    <Card style={{width: '400px'}}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Connexion
                            </Typography>
                            <form onSubmit={login}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Nom d'utilisateur ou email"
                                        variant="outlined"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Mot de passe"
                                        variant="outlined"
                                        type="password"
                                        id="password"
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                    />
                                </FormControl>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe}
                                                       onChange={(e) => setRememberMe(e.target.checked)}/>}
                                    label="Se souvenir de moi"
                                />
                                <Link to={"/lost-password"}>Mot de passe oublié</Link>
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    Se connecter
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card style={{width: '400px', height: '10%'}}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Créer un compte
                            </Typography>
                            <Button component={Link} to="/profil/create" variant="contained" color="primary" fullWidth>
                                S'inscrire
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
            {isMobile && (
                <div style={{
                    padding: isMobile ? '65px' : '80px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-around'
                }}>
                    <Card style={{marginBottom: isMobile ? '20px' : '0', width: isMobile ? '100%' : '400px'}}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Connexion
                            </Typography>
                            <form onSubmit={login}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Nom d'utilisateur ou email"
                                        variant="outlined"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Mot de passe"
                                        variant="outlined"
                                        type="password"
                                        id="password"
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                    />
                                </FormControl>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe}
                                                       onChange={(e) => setRememberMe(e.target.checked)}/>}
                                    label="Se souvenir de moi"
                                />
                                <Link to={"/lost-password"}>Mot de passe oublié</Link>
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    Se connecter
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card style={{width: isMobile ? '100%' : '400px'}}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Créer un compte
                            </Typography>
                            <Button component={Link} to="/profil/create" variant="contained" color="primary" fullWidth>
                                S'inscrire
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
};

export default Login;
