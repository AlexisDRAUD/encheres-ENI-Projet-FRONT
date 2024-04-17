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
import Navbar from "../../components/navbar";
import ArticleService from "../../service/articleService";

const CreateCategorieForm = () => {

    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await CategorieService.addCategorie(categorie);
            alert('Catégorie ajoutée avec succès!');
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
                const fetchedArticles = await ArticleService.getAllArticles();
                setArticles((fetchedArticles))
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

    console.log('articles', articles)

    const handleChange = (event) => {
        setCategorie({...categorie, libelle: event.target.value});
        console.log('categorie.libelle', categorie.libelle)
        console.log('categorie', categorie)
    };

    const canDelete = (id) => {
        console.log('canDelete', id)
        var articlesCategorie = articles.filter(a => a.categorie.id === id)
        console.log('articlesCategorie', articlesCategorie)
        if(articlesCategorie.length !== 0){
            console.log('true')
            return true
        }else{
            console.log('false')
            return false
        }
    }

    async function suppCategorie(id) {
        try {
            console.log('delete', id)
            await CategorieService.deleteCategorie(id);
            alert('Catégorie supprimée avec succès!');
        } catch (error) {
            alert('Failed to delete catégorie: ' + error.message);
        }
        window.location.reload();
    }
    console.log('categories', categories)

    return (
        <>
            <Navbar />
            <div style={{ padding: '80px' }}>
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
                                <TableCell component="th" scope="row" align="center" >
                                    <Button type="button" variant="contained" color="primary" onClick={() => suppCategorie(categorie.id)}
                                    disabled={canDelete(categorie.id)}>
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
            </div>
            </>
    );
};

export default CreateCategorieForm;
