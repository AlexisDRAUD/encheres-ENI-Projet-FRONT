// CreateArticleForm.js
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Grid } from '@mui/material';
import ArticleService from "../../service/articleService";
import CategorieService from "../../service/categorieService";
import UtilisateurService from "../../service/utilisateurService";

const CreateArticleEditOrDelete = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    //const [articleRecup, setArticleRecup] = useState({});
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
        ville: ""
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

    console.log('ART', article)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            article.vendeur = await UtilisateurService.getUtilisateurById()
            await ArticleService.updateArticle(article);
            alert('Article update successfully!');
        } catch (error) {
            alert('Failed to update article: ' + error.message);
        }
    };



    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
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
                        Ajouter
                    </Button>
                </Grid>
            </form>

        </Grid>
    );
};

export default CreateArticleEditOrDelete;
