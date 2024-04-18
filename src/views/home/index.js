import React, { useEffect, useState } from 'react';
import CategorieService from "../../service/categorieService";
import {
    Box,
    Card,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    CardContent,
    Typography,
    Grid,
    Pagination,
    useMediaQuery,
    useTheme, InputLabel,
} from '@mui/material';
import Filters from "../../components/filter";
import Navbar from "../../components/navbar";
import SearchService from "../../service/searchService";
import Articlecard from "../../components/articlecard";

import './Home.css'; // Importation des styles CSS

const Home = () => {
    const theme = useTheme();
    const [, setPageArticles] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);
    const key = JSON.parse(sessionStorage.getItem('user'));
    const [filters, setFilters] = useState({
        userId: (key && key.id) ? key.id : 0,
        search: '',
        categorieId: 0,
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
                sessionStorage.setItem("filters", JSON.stringify(filters));
                const PageArticlesData = await SearchService.Search(pageNum);
                setPageArticles(PageArticlesData);
                setArticles(PageArticlesData.content)
                setTotalPages(PageArticlesData.totalPages)
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

        fetchResources();
        updateUser();
        window.addEventListener('storage', updateUser);
        return () => {
            window.removeEventListener('storage', updateUser);
        };
    }, [filters, pageNum]);

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        sessionStorage.setItem("filters", JSON.stringify(newFilters));
    };

    const handlePageChange = async (event, value) => {
        setPageNum(value);
        const PageArticlesData = await SearchService.Search(value);
        setPageArticles(PageArticlesData);
        setArticles(PageArticlesData.content)
        setTotalPages(PageArticlesData.totalPages)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        const newFilters = { ...filters, categorieId: value };
        updateFilters(newFilters);
        setSelectedCategory(value);
    };

    const handleSearchClick = async () => {
        const PageArticlesData = await SearchService.Search(pageNum);
        setPageArticles(PageArticlesData);
        setArticles(PageArticlesData.content)
        setTotalPages(PageArticlesData.totalPages)
    };

    const FilterGrid = () => {
        const handleCheckboxChange = async (event) => {
            const { name, checked } = event.target;
            const newFilters = { ...filters, [name]: checked };
            updateFilters(newFilters);
            setPageNum(1);
            const PageArticlesData = await SearchService.Search(1);
            setPageArticles(PageArticlesData);
            setArticles(PageArticlesData.content)
            setTotalPages(PageArticlesData.totalPages)
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
            <div className="container">
                <Typography variant="h4" align="center" gutterBottom>
                    Liste des enchères
                </Typography>
                {isMobile && (
                    <>
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
                        <Grid item xs={12} sm={4} md={3} justifyContent="center" alignItems="center">
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                {user ? <FilterGrid/> : null}
            </div>
            </>
                )}
                {!isMobile && (
                    <Box display="flex" justifyContent="center">
                        <Grid container alignItems="stretch" justifyContent="center" spacing={3}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className="card-container">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom className="card-header">
                                            Categories
                                        </Typography>
                                        <FormControl fullWidth className="card-content">
                                            <Select
                                                labelId="category-label"
                                                id="category-select"
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                                displayEmpty
                                            >
                                                <MenuItem value={0}><em>Toutes les Categories</em></MenuItem>
                                                {categories.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.libelle}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {user ? <FilterGrid/> : null}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} justifyContent="center" alignItems="center">
                                <Card className="card-container">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom className="card-header">
                                            Recherche d'articles
                                        </Typography>
                                        <div className="card-content">
                                            <TextField
                                                fullWidth
                                                label="Le nom de l'article contient"
                                                variant="outlined"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <Box marginTop={2}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={handleSearchClick}
                                                    className="search-button"
                                                >
                                                    Recherche
                                                </Button>
                                            </Box>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </div>
            {!isMobile && (
                <Grid container spacing={3} justifyContent="center" className="articles-grid"> {/* Ajout de la classe CSS */}
                    {articles.length > 0 ? (
                        articles.map(article => (
                            <Articlecard
                                article={article}
                            />                        ))
                    ) : (
                        <Typography variant="h5" align="center" style={{ width: '100%' }}>
                            Pas de produit trouvé
                        </Typography>
                    )}
                </Grid>
            )}
            {isMobile && (
                <Grid container spacing={3} justifyContent="center" className="articles-grid"> {/* Ajout de la classe CSS */}
                    {articles.length > 0 ? (
                        articles.map(article => (
                            <Articlecard
                            article={article}
                            />
                        ))
                    ) : (
                        <Typography variant="h5" align="center" style={{ width: '100%' }}>
                            Pas de produit trouvé
                        </Typography>
                    )}
                </Grid>
            )}
            <div className="pagination-container">
                <Pagination count={totalPages} page={pageNum} onChange={handlePageChange} shape="rounded" />
            </div>
        </>
    );
};

export default Home;
