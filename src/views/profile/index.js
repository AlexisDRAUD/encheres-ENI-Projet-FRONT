import React, { useState, useEffect } from 'react';
import UtilisateurService from "../../service/utilisateurService";
import {Button, TextField, Typography} from "@mui/material";
import utilisateurService from "../../service/utilisateurService";

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
    });
    const [editable, setEditable] = useState(false);


    useEffect(() => {
        // Fonction pour charger les informations du profil utilisateur
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
            await utilisateurService.updateUser(utilisateur)
            alert('Les informations utilisateur ont été mises à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
        }
    };

    return (
        <div>
            <Typography variant="h4">Profil Utilisateur</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nom"
                    name="nom"
                    value={utilisateur.nom}
                    disabled={!editable}
                    onChange={handleChangeUser}
                    fullWidth
                />
                <TextField
                    label="Prénom"
                    name="prenom"
                    value={utilisateur.prenom}
                    disabled={!editable}
                    onChange={handleChangeUser}
                    fullWidth
                />
                <TextField
                    label="Pseudo"
                    name="pseudo"
                    value={utilisateur.pseudo}
                    disabled={!editable}
                    onChange={handleChangeUser}
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    value={utilisateur.email}
                    disabled={!editable}
                    onChange={handleChangeUser}
                    fullWidth
                />
                <TextField
                    label="Téléphone"
                    name="telephone"
                    value={utilisateur.telephone}
                    disabled={!editable}
                    onChange={handleChangeUser}
                    fullWidth
                />
                <TextField
                    label="Rue"
                    name="rue"
                    value={utilisateur.adresse.rue}
                    disabled={!editable}
                    onChange={handleChangeUserAdresse}
                    fullWidth
                />
                <TextField
                    label="Code Postal"
                    name="codePostal"
                    value={utilisateur.adresse.codePostal}
                    disabled={!editable}
                    onChange={handleChangeUserAdresse}
                    fullWidth
                />
                <TextField
                    label="Ville"
                    name="ville"
                    value={utilisateur.adresse.ville}
                    disabled={!editable}
                    onChange={handleChangeUserAdresse}
                    fullWidth
                />
                {editable && <Button type="submit" variant="contained" color="primary">Enregistrer</Button>}
            </form>
            {!editable && (
                <Button onClick={() => setEditable(true)} variant="outlined" color="primary">Modifier</Button>
            )}
        </div>
    );
};

export default Profil;
