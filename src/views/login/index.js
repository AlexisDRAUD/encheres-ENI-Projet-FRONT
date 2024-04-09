import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth-service'; // Importing the AuthService

const Login = () => {
    const [pseudo, setPseudo] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();

        try {
            const response = await AuthService.login(pseudo, motDePasse); // Using the login method from AuthService
            localStorage.setItem('user', JSON.stringify(response)); // Assuming response contains user data
            navigate('/');
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    return (
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
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
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
                <Button type="submit" variant="contained" color="primary">
                    Se connecter
                </Button>
            </form>
        </Box>
    );
};

export default Login;
