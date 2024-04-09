import React, { useState } from 'react';
import axios from 'axios'; // ensure axios is installed
import { TextField, Button, Box, Typography, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ensure react-router-dom is installed

const Login = () => {
    const [pseudo, setPseudo] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const navigate = useNavigate(); // This is to programmatically navigate to another route

    const login = async (event) => {
        event.preventDefault(); // Prevents the default form submit action

        try {
            const response = await axios.post('/login', {
                pseudo,
                motDePasse
            });
            localStorage.setItem('jwt', response.data);
            navigate('/'); // Navigates to the '/films' route after successful login
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
                        label="Nom d'utilisateur"
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
