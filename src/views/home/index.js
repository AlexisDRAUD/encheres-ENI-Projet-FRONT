import React, { useEffect, useState } from 'react';
import ArticleService from "../../service/articleService";
import CategorieService from "../../service/categorieService";
import AuthService from "../../service/auth-service";
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
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { Link } from 'react-router-dom';
import Filters from "../../components/filter";
import Navbar from "../../components/navbar";


const Home = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const articlesData = await ArticleService.getAllArticles();
                const categoriesData = await CategorieService.getAllCategories();
                setArticles(articlesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching resources:", error);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const FilterGrid = () => {
        const [filters, setFilters] = useState({
            openBids: false,
            ongoingBids: false,
            wonBids: false,
            ongoingSales: false,
            notStartedSales: false,
            completedSales: false,
        });

        const handleCheckboxChange = (event) => {
            setFilters({
                ...filters,
                [event.target.name]: event.target.checked,
            });
        };

        return (
            <Grid container spacing={2}>
                <Filters filters={filters} handleCheckboxChange={handleCheckboxChange} />
            </Grid>
        );
    };

    return (
        <>
            <Navbar />
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
                <Grid item xs={12} sm={8} md={7}>
                    <Button variant="contained" fullWidth>
                        Rechercher
                    </Button>
                </Grid>
            </Grid>
            <Grid justifyContent="center">
                {user ? <FilterGrid /> : null}
            </Grid>
            <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
                {articles.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} md={5} lg={5}>
                        <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <div style={{ width: '100%', height: 0, paddingTop: '100%', backgroundColor: 'grey' }}></div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography gutterBottom variant="h5" component="div" style={{ textDecoration: 'underline' }}>
                                                {article.nomArticle}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" component="div">
                                                <span >Prix :</span> {article.prixVente}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" component="div">
                                                <span >Fin de l'enchère :</span> {formatDate(article.dateFin)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" component="div">
                                                <span >Vendeur:</span> {article.vendeur.pseudo}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {article.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
            </>
    );
};

export default Home;
