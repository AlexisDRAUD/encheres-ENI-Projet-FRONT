import React, { useState, useEffect } from 'react';
import {Button, TextField, Typography, Box, Grid} from "@mui/material";
import UtilisateurService from "../../service/utilisateurService";


const Profil = () => {
    const [utilisateur, setUtilisateur] = useState({
        nom: '',
        prenom: '',
        pseudo: '',
        email: '',
        telephone: '',
        adresse: {
            rue: '',
            codePostal: '',
            ville: ''
        },
        motDePasse: '',
        credit: 0,
    });
    const [editable, setEditable] = useState(false);
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
    const [confirmation, setConfirmation] = useState('');

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

    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setUtilisateur((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleChangeUserAdresse = (e) => {
        const { name, value } = e.target;
        setUtilisateur((prevUser) => ({
            ...prevUser,
            ["adresse"]: {
                ...prevUser.adresse,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditable(false);
        try {
            await UtilisateurService.updateUser(utilisateur)
            alert('Les informations utilisateur ont été mises à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await UtilisateurService.deleteUser()
            alert("La suppression de l'utilisateur a réussi");
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Mon Profil
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Pseudo"
                            name="pseudo"
                            value={utilisateur.pseudo}
                            disabled={!editable}
                            onChange={handleChangeUser}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Nom"
                            name="nom"
                            value={utilisateur.nom}
                            disabled={!editable}
                            onChange={handleChangeUser}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Prénom"
                            name="prenom"
                            value={utilisateur.prenom}
                            disabled={!editable}
                            onChange={handleChangeUser}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={utilisateur.email}
                            disabled={!editable}
                            onChange={handleChangeUser}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Téléphone"
                            name="telephone"
                            value={utilisateur.telephone}
                            disabled={!editable}
                            onChange={handleChangeUser}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Rue"
                            name="rue"
                            value={utilisateur.adresse.rue}
                            disabled={!editable}
                            onChange={handleChangeUserAdresse}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Code Postal"
                            name="codePostal"
                            value={utilisateur.adresse.codePostal}
                            disabled={!editable}
                            onChange={handleChangeUserAdresse}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Ville"
                            name="ville"
                            value={utilisateur.adresse.ville}
                            disabled={!editable}
                            onChange={handleChangeUserAdresse}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Mot de passe actuel"
                            type="password"
                            name="motDePasse"
                            value={utilisateur.motDePasse}
                            disabled={!editable}
                            onChange={handleChangeUser}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Nouveau mot de passe"
                            type="password"
                            value={nouveauMotDePasse}
                            onChange={(e) => setNouveauMotDePasse(e.target.value)}
                            disabled={!editable}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Confirmation"
                            type="password"
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            disabled={!editable}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Typography variant="h6">
                    Crédit: {utilisateur.credit}
                </Typography>
                {editable && (
                    <>
                        <Button type="submit" variant="contained" color="primary">
                            Enregistrer
                        </Button>
                        <Button onClick={handleDeleteAccount} variant="outlined" color="secondary">
                            Supprimer mon compte
                        </Button>
                    </>
                )}
            </form>
            {!editable && (
                <Button onClick={() => setEditable(true)} variant="outlined" color="primary">
                    Modifier
                </Button>
            )}
        </Box>
    );
};

export default Profil;
