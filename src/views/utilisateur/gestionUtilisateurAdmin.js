// CreateUtilisateurForm.js
import React, {useEffect, useState} from 'react';
import {Button, Typography, Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UtilisateurService from "../../service/utilisateurService";
import Navbar from "../../components/navbar";
import {Link} from "react-router-dom";

const CreateUtilisateurForm = () => {

    const [utilisateurs, setUtilisateurs] = useState([]);
    const [utilisateursDesactive, setUtilisateursDesactive] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await UtilisateurService.getUtilisateurs() ;
                setUtilisateurs(fetchedUsers)
                const fetchedUsersDesact = await UtilisateurService.getUtilisateursDesactive() ;
                setUtilisateursDesactive(fetchedUsersDesact)

            } catch (error) {
                // handle errors
                console.error('Error fetching utilisateurs:', error);
            }
        };
        fetchUsers();
    }, []);

    async function suppUtilisateur(id) {
        try {
            await UtilisateurService.deleteUserByAdmin(id);
            alert('Utilisateur supprimée avec succès!');
            // Reset form or navigate away
        } catch (error) {
            alert('Failed to delete utilisateur: ' + error.message);
        }
        window.location.reload();
    }

    async function desactiveUtilisateur(id) {
        try {
            console.log('delete', id)
            await UtilisateurService.desactiverUserByAdmin(id);
            alert('Utilisateur désactivé avec succès!');
            // Reset form or navigate away
        } catch (error) {
            alert('Pb lors de la désactivation de l\' utilisateur: ' + error.message);
        }
        window.location.reload();
    }

    async function reactiveUtilisateur(id) {
        try {
            console.log('reactiver', id)
            UtilisateurService.reactiverUserByAdmin(id)
            alert('Utilisateur réactivé avec succès!');
            // Reset form or navigate away
        } catch (error) {
            alert('Pb lors de la réactivation de l\' utilisateur: ' + error.message);
        }
        window.location.reload();
    }




    return (
        <>
            <Navbar />
            <div style={{ padding: '80px' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                    <Typography variant="h4" gutterBottom>
                        Liste des utilisateurs
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 1500 }} aria-label="simple table" align="center">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="center">Nom</TableCell>
                                    <TableCell align="center">Prénom</TableCell>
                                    <TableCell align="center">username</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {utilisateurs.map((u) => (
                                    <TableRow
                                        key={u.id}
                                        sx={{ width: '30%' } }
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {u.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {u.nom}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {u.prenom}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {u.username}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            <Button type="button" variant="contained" color="primary" onClick={() => suppUtilisateur(u.id)}>
                                                Supprimer
                                            </Button>
                                            <Button type="button" variant="contained" color="primary" onClick={() => desactiveUtilisateur(u.id)}>
                                                Désactiver
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h4" gutterBottom>
                        Liste des utilisateurs désactivés
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 1500 }} aria-label="simple table" align="center">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="center">Nom</TableCell>
                                    <TableCell align="center">Prénom</TableCell>
                                    <TableCell align="center">username</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {utilisateursDesactive.map((u) => (
                                    <TableRow
                                        key={u.id}
                                        sx={{ width: '30%' } }
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {u.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {u.nom}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {u.prenom}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {u.username}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            <Button type="button" variant="contained" color="primary" onClick={() => reactiveUtilisateur(u.id)}>
                                                Réactiver
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Retour
                </Button>
            </div>
        </>
    );
};

export default CreateUtilisateurForm;
