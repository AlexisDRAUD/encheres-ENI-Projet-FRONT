// CreateArticleForm.js
import React, {useEffect, useState} from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Grid } from '@mui/material';
import ArticleService from "../../service/articleService";
import CategorieService from "../../service/categorieService";

const CreateArticleForm = () => {
    const [categories, setCategories] = useState([]);
    const [article, setArticle] = useState({
        nomArticle: "",
        description: "",
        dateDebut: '',
        dateFin: '',
        miseAPrix: '',
        prixVente: '',
        categorie: { id: '', libelle: '' },
        vendeur: {
            id: 4,
            pseudo: "admin",
            nom: "admin",
            prenom: "admin",
            email: "admin@test.com",
            telephone: "0102030405",
            adresse: {
                id: 4,
                rue: "rue du test1",
                code_postal: 79000,
                ville: "Niort"
            },
            password: "password",
            credit: 500,
            administrateur: true
        },
        retrait: {
            id: 4,
            rue: "rue du test1",
            code_postal: 79000,
            ville: "Niort"
        }
    });

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const categoriesData = await CategorieService.getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                // handle errors or set default values
            }
        };

        fetchResources();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        console.log(event.target)
        setArticle((prevArticle) => ({
            ...prevArticle,
            categorie: { id : value.id , libelle: value.libelle}
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ArticleService.addArticle(article);
            alert('Article added successfully!');
            // Reset form or navigate away
        } catch (error) {
            alert('Failed to add article: ' + error.message);
        }
    };


    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
            <Typography variant="h4" gutterBottom>
                Créer un nouvel article
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                        label="Prix de vente"
                        name="prixVente"
                        type="number"
                        value={article.prixVente}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Catégorie</InputLabel>
                        <Select
                            labelId="category-label"
                            id="categorie-select"
                            value={article.categorie.id}
                            name="categorie"
                            onChange={handleCategoryChange}
                            label="Catégorie"
                        >
                            <MenuItem value=""><em>Aucune</em></MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category}>
                                    {category.libelle}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Ajouter
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
};

export default CreateArticleForm;
