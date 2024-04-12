import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControl, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth-service';
import Navbar from "../../components/navbar";

const Login = () => {
    const [username, setUsername] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

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
            <Box>
                <Typography variant="h4" component="h2" gutterBottom>
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
                        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Se souvenir de moi"
                    />
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained" color="primary">
                            Se connecter
                        </Button>
                    )}
                </form>
                <Button component={Link} to="/profil/create" variant="contained" color="primary">
                    Créer un compte
                </Button>
            </Box>
        </>
    );
};

export default Login;
