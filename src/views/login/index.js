import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth-service';
import Navbar from "../../components/navbar"; // Importing the AuthService

const Login = () => {
    const [username, setUsername] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when login starts
        try {
            await AuthService.login(username, motDePasse);
            window.location.reload()
            window.location.replace("/");
        } catch (error) {
            console.error('Erreur de connexion:', error);
        } finally {
            setLoading(false); // Set loading to false when login finishes
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
                {loading ? ( // Show loading indicator if loading is true
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
