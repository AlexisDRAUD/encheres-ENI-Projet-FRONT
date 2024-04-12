import React, { useEffect, useState } from 'react';
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
import Filters from "../../components/filter";
import Navbar from "../../components/navbar";
import SearchService from "../../service/searchService";
import ArticleService from "../../service/articleService";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);
    const key = JSON.parse(sessionStorage.getItem('user'));
    const [filters, setFilters] = useState({
        userId: (key && key.id) ? key.id : 0,
        search: '',
        categorieId :0,
        openBids: true,
        ongoingBids: false,
        wonBids: false,
        ongoingSales: false,
        notStartedSales: false,
        completedSales: false,
    });

    useEffect(() => {
        const fetchResources = async () => {
            try {
                if (!key){
                    const articlesData = await ArticleService.getAllArticles();
                    setArticles(articlesData);
                }else {
                    sessionStorage.setItem("filters", JSON.stringify(filters));
                    const articlesData = await SearchService.Search();
                    setArticles(articlesData);
                }
                const categoriesData = await CategorieService.getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };

        fetchResources();

        const userFromSession = JSON.parse(sessionStorage.getItem('user'));
        setUser(userFromSession);

        const updateUser = () => {
            const userFromSession = JSON.parse(sessionStorage.getItem('user'));
            setUser(userFromSession);
        };

        window.addEventListener('storage', updateUser);
        return () => {
            window.removeEventListener('storage', updateUser);
        };
    }, []);

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        sessionStorage.setItem("filters", JSON.stringify(newFilters));
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        const newFilters = { ...filters, search: value };
        updateFilters(newFilters);
        setSearchTerm(value);
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        const newFilters = { ...filters, categorieId: value };
        updateFilters(newFilters);
        setSelectedCategory(value);
    };

    const handleSearchClick = async () => {
        const articlesData = await SearchService.Search();
        setArticles(articlesData);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const FilterGrid = () => {
        const handleCheckboxChange = (event) => {
            const { name, checked } = event.target;
            const newFilters = { ...filters, [name]: checked };
            updateFilters(newFilters);
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
                                <MenuItem value={0}>
                                    <em>Toutes</em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.libelle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={7}>
                        <Button variant="contained" fullWidth onClick={handleSearchClick}>
                            Rechercher
                        </Button>
                    </Grid>
                </Grid>
                <Grid justifyContent="center">
                    {user ? <FilterGrid /> : null}
                </Grid>
                <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
                    {articles.length > 0 ? (
                        articles.map(article => (
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
                                                        <span>Prix :</span> {(article.prixVente) ? article.prixVente : article.miseAPrix}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        <span>Fin de l'enchère :</span> {formatDate(article.dateFin)}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" component="div">
                                                        <span>Vendeur:</span> {article.vendeur.username}
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
                        ))
                    ) : (
                        <Typography variant="h5" align="center" style={{ width: '100%' }}>
                            Pas de produit trouvé
                        </Typography>
                    )}
                </Grid>
            </div>
        </>
    );
};

export default Home;
