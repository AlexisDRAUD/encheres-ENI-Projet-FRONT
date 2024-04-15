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
    Snackbar
} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import AuthService from '../../service/auth-service';
import Navbar from "../../components/navbar";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const [errors, setErrors] = useState({
        password: '',
        passwordConfirmation: '',
        url: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(errors)
        if (errors.url && errors.url != '') {
            setOpenSnackbar(true);
        }
    }, [errors]);

    const save = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await AuthService.savePass(password, passwordConfirmation, token);
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
                    Changez de mot de passe
                </Typography>
                <form onSubmit={save}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Nouveau mot de passe"
                            variant="outlined"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.password}
                        </Typography>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Confirmation du mot de passe"
                            variant="outlined"
                            type="password"
                            id="passwordConfirmation"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.passwordConfirmation}
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
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={errors.url}
                />
            </Box>
        </>
    );
};

export default ChangePassword;
