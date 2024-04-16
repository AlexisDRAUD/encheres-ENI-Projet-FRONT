import React, { useState, useEffect } from 'react';
import {Button, TextField, Typography, Box, Grid} from "@mui/material";
import UtilisateurService from "../../service/utilisateurService";
import authService from "../../service/auth-service";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../../components/navbar";


const Profil = () => {
    const { param } = useParams();
    const navigate = useNavigate()
    const isCreation = param === "create"
    const [utilisateur, setUtilisateur] = useState({
        nom: '',
        prenom: '',
        username: '',
        email: '',
        telephone: '',
        rue: '',
        codePostal: '',
        ville: '',
        oldPassword: '',
        password: '',
        passwordConfirmation: '',
        credit: 0,
    });
    const [errors, setErrors] = useState({
        nom: '',
        prenom: '',
        username: '',
        email: '',
        telephone: '',
        rue: '',
        codePostal: '',
        ville: '',
        oldPassword: '',
        password: '',
        passwordConfirmation: ''
    });
    const [editable, setEditable] = useState(isCreation);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UtilisateurService.getUtilisateurById();
                setUtilisateur(userData);
            } catch (error) {
                // handle errors or set default values
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isCreation) {
                const response = await UtilisateurService.addUser(utilisateur)
                if (response) {
                    setErrors(response)
                } else {
                    navigate("/")
                }
            } else {
                const response = await UtilisateurService.updateUser(utilisateur)
                if (response) {
                    setErrors(response)
                } else {
                    navigate("/")
                }
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await UtilisateurService.deleteUser()
            alert("La suppression de l'utilisateur a réussi");
            authService.logout();
            window.location.replace("/");
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '80px' }}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Mon Profil
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Pseudo"
                            name="username"
                            value={utilisateur.username}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Nom"
                            name="nom"
                            value={utilisateur.nom}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.nom}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Prénom"
                            name="prenom"
                            value={utilisateur.prenom}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.prenom}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={utilisateur.email}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Téléphone"
                            name="telephone"
                            value={utilisateur.telephone}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.telephone}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Rue"
                            name="rue"
                            value={utilisateur.rue}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.rue}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Code Postal"
                            name="codePostal"
                            value={utilisateur.codePostal}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.codePostal}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Ville"
                            name="ville"
                            value={utilisateur.ville}
                            disabled={!editable}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="caption" style={{color:"#FF0000"}}>
                            {errors.ville}
                        </Typography>
                    </Grid>

                    {editable && !isCreation ? (
                        <Grid item xs={6}>
                            <TextField
                                label="Mot de passe actuel"
                                type="password"
                                name="oldPassword"
                                value={isCreation ? utilisateur.password : utilisateur.oldPassword}
                                disabled={!editable}
                                onChange={handleChange}
                                fullWidth
                            />
                            <Typography variant="caption" style={{color:"#FF0000"}}>
                                {errors.oldPassword}
                            </Typography>
                        </Grid>) : null}

                    {editable ?
                            (<Grid item xs={6}>
                                <TextField
                                    label={isCreation ? "Mot de passe" : "Nouveau mot de passe"}
                                    type="password"
                                    name="password"
                                    value={utilisateur.password}
                                    onChange={handleChange}
                                    disabled={!editable}
                                    fullWidth
                                />
                                <Typography variant="caption" style={{color:"#FF0000"}}>
                                    {errors.password}
                                </Typography>
                            </Grid>) : null}

                    {editable ? (
                        <Grid item xs={6}>
                            <TextField
                                label="Confirmation"
                                type="password"
                                name="passwordConfirmation"
                                value={utilisateur.passwordConfirmation}
                                onChange={handleChange}
                                disabled={!editable}
                                fullWidth
                            />
                            <Typography variant="caption" style={{color:"#FF0000"}}>
                                {errors.passwordConfirmation}
                            </Typography>
                    </Grid>) : null}

                </Grid>
                {isCreation ? null :
                    (<Typography variant="h6">
                        Crédit: {utilisateur.credit}
                    </Typography>)}
                {editable && (
                    <>
                        <Button type="submit" variant="contained" color="primary">
                            Enregistrer
                        </Button>
                        {isCreation ?
                            (<Button onClick={async () => {navigate("/")}} variant="outlined" color="secondary">
                                Annuler
                            </Button>)
                            :
                            (<Button onClick={handleDeleteAccount} variant="outlined" color="secondary">
                                Supprimer mon compte
                            </Button>)}

                    </>
                )}
            </form>
            {!editable && (
                <Button onClick={() => setEditable(true)} variant="outlined" color="primary">
                    Modifier
                </Button>
            )}
        </Box>
            </div>
            </>
    );
};

export default Profil;
