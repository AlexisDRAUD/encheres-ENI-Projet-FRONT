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
} from '@mui/material';
import { Link } from 'react-router-dom';
import Filters from "../../components/filter";
import Navbar from "../../components/navbar";
import SearchService from "../../service/searchService";


const Home = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);
    const [filters, setFilters] = useState({
        userId: (user && user.id) ? user.id : '',
        search: '',
        categorieId :'',
        openBids: false,
        ongoingBids: false,
        wonBids: false,
        ongoingSales: false,
        notStartedSales: false,
        completedSales: false,
    });
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

        const updateUser = () => {
            const userFromSession = JSON.parse(sessionStorage.getItem('user'));
            setUser(userFromSession);
        };

        fetchResources();
        updateUser();
        window.addEventListener('storage', updateUser);
        return () => {
            window.removeEventListener('storage', updateUser);
        };
    }, []);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        sessionStorage.setItem("filters", JSON.stringify({
            ...filters,
            search: value,
        }));
        setSearchTerm(value);
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        sessionStorage.setItem("filters", JSON.stringify({
            ...filters,
            categorieId: value,
        }));
        setSelectedCategory(value);
    };

    const handleSearchClick = async () => {
        const articlesData = await SearchService.Search();
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
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: checked,
            }));
            sessionStorage.setItem("filters", JSON.stringify({
                ...filters,
                [name]: checked,
            }));
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
