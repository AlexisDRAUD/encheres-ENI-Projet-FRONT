// CreateCategorieForm.js
import React, {useEffect, useState} from 'react';
import {TextField, Button, Typography, Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CategorieService from "../../service/categorieService";

const CreateCategorieForm = () => {

    const [categories, setCategories] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await CategorieService.addCategorie(categorie);
            alert('Catégorie ajoutée avec succès!');
            // Reset form or navigate away
        } catch (error) {
            alert('Failed to add catégorie: ' + error.message);
        }
        window.location.reload();
    };

    useEffect(() => {
        const fetchCategories = async () => {
            console.log('fetchCategories start')
            try {
                const fetchedCategories = await CategorieService.getAllCategories();
                setCategories(fetchedCategories)
                console.log('fetchedCategories recup', fetchedCategories)
            } catch (error) {
                // handle errors
                console.error('Error fetching article:', error);
            }
        };
        fetchCategories();
    }, []);

    const [categorie, setCategorie] = useState({
        libelle: ""
    });

    const handleChange = (event) => {
        setCategorie({...categorie, libelle: event.target.value});
        console.log('categorie.libelle', categorie.libelle)
        console.log('categorie', categorie)
    };

    async function suppCategorie(id) {
        try {
            console.log('delete', id)
            await CategorieService.deleteCategorie(id);
            alert('Catégorie supprimée avec succès!');
            // Reset form or navigate away
        } catch (error) {
            alert('Failed to delete catégorie: ' + error.message);
        }
        window.location.reload();
    }

    console.log('categories', categories)

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
            <Typography variant="h4" gutterBottom>
                Créer une nouvelle catégorie
            </Typography>
            <form onSubmit={handleSubmit} style={{width: '100%'}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Catégorie"
                        name="nomCategorie"
                        value={categorie.libelle}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Ajouter
                    </Button>
                </Grid>
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1500 }} aria-label="simple table" align="center">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Libellé</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((categorie) => (
                            <TableRow
                                key={categorie.id}
                                sx={{ width: '30%' } }
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {categorie.id}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    {categorie.libelle}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <Button type="button" variant="contained" color="primary" onClick={() => suppCategorie(categorie.id)}>
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default CreateCategorieForm;
