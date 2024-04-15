import React, { useEffect, useState } from 'react';
import CategorieService from "../../service/categorieService";
import {
    Box,
    Card,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CardContent,
    Typography,
    Grid, Pagination, useMediaQuery, useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Filters from "../../components/filter";
import Navbar from "../../components/navbar";
import SearchService from "../../service/searchService";
import ArticleService from "../../service/articleService";


const Home = () => {
    const theme = useTheme();
    const [PageArticles, setPageArticles] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);
    const key = JSON.parse(sessionStorage.getItem('user'));
    const [date, setDate] = useState(new Date(Date.now()));
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
    const [canEdit, setCanEdit] = useState(false);
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
    }, []);

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
        const PageArticlesData = await SearchService.Search(pageNum);
        setPageArticles(PageArticlesData);
        setArticles(PageArticlesData.content)
        setTotalPages(PageArticlesData.totalPages)
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const FilterGrid = () => {
        const handleCheckboxChange = async (event) => {
            const {name, checked} = event.target;
            const newFilters = {...filters, [name]: checked};
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
            <div style={{ padding: '80px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Liste des enchères
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Grid container alignItems="stretch" justifyContent="center">
                        <Grid item xs={12} sm={4} md={3}>
                            <TextField
                                fullWidth
                                label="Le nom de l'article contient"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <FormControl fullWidth>
                                <Select
                                    labelId="category-label"
                                    id="category-select"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    displayEmpty
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
                            {user ? <FilterGrid /> : null}
                        </Grid>
                        <Grid item xs={12} sm={5} md={4}>
                            {isMobile && (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSearchClick}
                                >
                                    Rechercher
                                </Button>
                            )}
                            {!isMobile && (
                            <Button
                                variant="contained"
                                style={{ height: '40%', width: '60%' , right: '-40%', bottom: '-50%'}}
                                onClick={handleSearchClick}
                            >
                                Rechercher
                            </Button>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <Grid container spacing={3} justifyContent="center" style={{marginTop: '20px'}}>
                {articles.length > 0 ? (
                    articles.map(article => (
                            <Grid item key={article.id} xs={12} sm={6} md={5} lg={5}>
                                <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <div>
                                                        {article.img ? (
                                                            <div>
                                                                <img src={article.img} alt="Image de l'article"
                                                                     style={{width: '100%', height: 'auto'}}/>
                                                            </div>

                                                        ) : (
                                                            <div style={{
                                                                width: '100%',
                                                                height: 0,
                                                                paddingTop: '100%',
                                                                backgroundColor: 'grey'
                                                            }}></div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography gutterBottom variant="h5" component="div"
                                                                style={{textDecoration: 'underline' }}>
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
                                                    {(formatDate(article.dateDebut) > formatDate(date) && article.vendeur.id === key.id)
                                                        ? (<Link to={`/article/${article.id}/edit_or_delete`}>Modifier</Link>)
                                                        : (<></>)
                                                    }
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={totalPages} page={pageNum}  onChange={handlePageChange} shape="rounded" style={{ margin: 'auto', textAlign: 'center' }} />
                </div>
        </>
    );
};

export default Home;
