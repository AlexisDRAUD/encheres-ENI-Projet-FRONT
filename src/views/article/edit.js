// CreateArticleForm.js
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Grid } from '@mui/material';
import ArticleService from "../../service/articleService";
import CategorieService from "../../service/categorieService";
import Navbar from "../../components/navbar";
import axios from "axios";

const CreateArticleEditOrDelete = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [article, setArticle] = useState({
        idArticle:0,
        nomArticle: "",
        description: "",
        dateDebut: '',
        dateFin: '',
        miseAPrix: '',
        prixVente: '',
        categorieId: "",
        vendeurId: "",
        rue: "",
        codePostal: "",
        ville: "",
        img:''
    });
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const categoriesData = await CategorieService.getAllCategories();
                setCategories(categoriesData);
                const fetchedArticle = await ArticleService.getArticleForUpdate(id)
                setArticle(fetchedArticle)
            } catch (error) {
                console.log('ERROR')
                // handle errors or set default values
            }
        };
        fetchResources();

    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        const formData = new FormData();
        formData.append('image', file);
        event.preventDefault();
        try {
            article.img = ('http://localhost:8080/upload/' + file.name);
            await axios.post('http://localhost:8080/upload', formData);
            await ArticleService.updateArticle(article);
            alert('Article update successfully!');
        } catch (error) {
            alert('Failed to update article: ' + error.message);
        }
    };

    async function deleteArticle(id) {
        try {
            await ArticleService.deleteArticle(id);
            alert('Catégorie supprimée avec succès!');
            // Reset form or navigate away
        } catch (error) {
            alert('Failed to delete catégorie: ' + error.message);
        }
        window.location.replace("/");
    }

    return (
        <>
            <Navbar/>
            <div style={{ padding: '80px' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>
                            Modifier ou supprimer une vente
                        </Typography>
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nom de l'article"
                            name="nomArticle"
                            value={article.nomArticle}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={article.description}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="datetime-local"
                            label="Date de début"
                            name="dateDebut"
                            value={article.dateDebut}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            type="datetime-local"
                            label="Date de fin"
                            name="dateFin"
                            value={article.dateFin}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Mise à prix"
                            name="miseAPrix"
                            type="number"
                            value={article.miseAPrix}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Rue"
                            name="rue"
                            value={article.rue}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Code postal"
                            name="codePostal"
                            value={article.codePostal}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Ville"
                            name="ville"
                            value={article.ville}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Catégorie</InputLabel>
                            <Select
                                labelId="category-label"
                                id="categorie-select"
                                value={article.categorieId}
                                name="categorieId"
                                onChange={handleChange}
                                label="Catégorie"
                            >
                                <MenuItem value=""><em>Aucune</em></MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.libelle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography>
                            Photo de l'article
                        </Typography>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                component="span"
                                variant="contained"
                            >
                                Upload file
                            </Button>
                        </label>
                        <Button type="submit" variant="contained" color="primary">
                            Modifier
                        </Button>
                        <Button variant="contained" color="primary" component={Link} to="/">
                        Retour
                    </Button>
                        <Button type="button" variant="contained" color="primary" onClick={() => deleteArticle(article.id)}>
                            Supprimer
                        </Button>
                    </Grid>
                </form>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {article.img ? (
                            <img src={article.img} alt="Article" style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            <div style={{ width: '100%', height: '300px', backgroundColor: 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', color: 'white' }}>
                                No image
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default CreateArticleEditOrDelete;
