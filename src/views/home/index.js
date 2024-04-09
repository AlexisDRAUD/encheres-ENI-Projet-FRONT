import React, { useEffect, useState } from 'react';
import ArticleService from "../../service/articleService";
import CategorieService from "../../service/categorieService";
import {
    Card,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const articlesData = await ArticleService.getAllArticles();
                const categoriesData = await CategorieService.getAllCategories();
                setArticles(articlesData);
                setCategories(categoriesData);
            } catch (error) {
                // handle errors or set default values
            }
        };

        fetchResources();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Liste des enchères
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Le nom de l'article contient"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Catégorie</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Catégorie"
                        >
                            <MenuItem value="">
                                <em>Toutes</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.libelle}>
                                    {category.libelle}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={1}>
                    <Button variant="contained" fullWidth>
                        Rechercher
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
                {articles.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card >
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                        {article.nomArticle}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Prix : {article.prixVente}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Fin de l'enchère : {article.dateFin}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Vendeur: {article.vendeur.nom}, {article.vendeur.prenom}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {article.description}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
