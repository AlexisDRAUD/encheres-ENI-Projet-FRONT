import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth-service';
import Navbar from "../../components/navbar";

const LostPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const reset = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await AuthService.forgottenPass(email);
            if (response) {
                setErrors(response)
            } else {
                navigate("/login")
            }
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
                    Mot de passe oublié
                </Typography>
                <form onSubmit={reset}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="email"
                            variant="outlined"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.email}
                        </Typography>
                    </FormControl>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained" color="primary">
                            Continuer
                        </Button>
                    )}
                </form>
            </Box>
        </>
    );
};

export default LostPassword;
