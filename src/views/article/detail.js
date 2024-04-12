import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {
    Typography,
    Grid,
    CircularProgress,
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    Snackbar, MenuItem
} from '@mui/material';
import ArticleService from '../../service/articleService';
import UtilisateurService from "../../service/utilisateurService";
import EnchereService from "../../service/enchereService";
import Paper from "@mui/material/Paper";
import Navbar from "../../components/navbar";

const ArticleDetail = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { id } = useParams();
    const currentDate = new Date();

    const isConnected = () => {
        const user = sessionStorage.getItem("user");
        return user !== null;
    };

    useEffect(() => {
        const fetchArticleAndUser = async () => {
            try {
                const fetchedArticle = await ArticleService.getdetailArticles(id);
                setArticle(fetchedArticle);
                const fetchedUtilisateur = await UtilisateurService.getUtilisateurById("userId");
                setCurrentUtilisateur(fetchedUtilisateur);
                const fetchedEnchere = await EnchereService.getAllEncheresbyarticle(fetchedArticle.id);
                setEncheres(fetchedEnchere.sort((a, b) => b.montantEnchere - a.montantEnchere));
            } catch (error) {
                console.error('Error fetching article, encheres or user:', error);
            }
        };
        fetchArticleAndUser();
    }, [id]);

    const [encheres, setEncheres] = useState([]);
    const [article, setArticle] = useState(null);
    const [currentUtilisateur, setCurrentUtilisateur] = useState(null);
    const [proposition, setproposition] = useState("");
    const [errors, setErrors] = useState([]);
    const [enchere, setenchree] = useState({
        dateEnchere: "",
        montantEnchere: 0,
        userId: "",
        articleId:"",
    });

    const handleSearchChange = (event) => {
        setproposition(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Construire la date actuelle au format ISO
        const formattedDateTime = currentDate.toISOString();

        enchere.articleId = article.id;
        enchere.userId = currentUtilisateur.id;
        enchere.montantEnchere = proposition;
        enchere.dateEnchere = formattedDateTime;

        try {
            const response = await EnchereService.addEnchere(enchere);
            if (response) {
                if (response.montant) {
                    setErrors([response.montant]);
                    setOpenSnackbar(true);
                } else if (response.user) {
                    setErrors([response.user]);
                    setOpenSnackbar(true);
                } else {
                    setErrors([]);
                }
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enchère:', error);
            setErrors(['Une erreur s\'est produite lors de l\'ajout de l\'enchère']);
            setOpenSnackbar(true);
        } finally {
            setErrors(["Enchère créée avec succès"]);
            setOpenSnackbar(true);
            const fetchedArticle = await ArticleService.getdetailArticles(id);
            setArticle(fetchedArticle);
            const fetchedUtilisateur = await UtilisateurService.getUtilisateurById("userId");
            setCurrentUtilisateur(fetchedUtilisateur);
            const fetchedEnchere = await EnchereService.getAllEncheresbyarticle(fetchedArticle.id);
            setEncheres(fetchedEnchere.sort((a, b) => b.montantEnchere - a.montantEnchere));
            setproposition("");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (!article) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={8}>
                    <Typography variant="h3">{article.nomArticle}</Typography>
                    <Typography variant="body1">Description: {article.description}</Typography>
                    <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                    <Typography variant="body1">Meilleure offre: {encheres.length > 0 ? `${encheres[0].montantEnchere}€ par ${encheres[0].utilisateur.username}` : "Aucune offre pour le moment"}</Typography>
                    <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                    <Typography variant="body1">Fin de l'enchère : {formatDate(article.dateFin)}</Typography>
                    <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>
                    <Typography variant="body1">Vendeur: {article.vendeur.username}</Typography>
                    {isConnected() && currentUtilisateur && article.vendeur.id !== currentUtilisateur.id && formatDate(article.dateFin) > formatDate(currentDate) && formatDate(article.dateDebut) < formatDate(currentDate) &&(
                        <>
                            <form onSubmit={handleSubmit} style={{width: '100%'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type={"number"}
                                        label="Ma Proposition"
                                        variant="outlined"
                                        value={proposition}
                                        onChange={handleSearchChange}
                                    />
                                    <Button type="submit" variant="contained" color="primary">
                                        Enchérir
                                    </Button>
                                </Grid>
                            </form>
                        </>
                    )}
                </Grid>
                {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && encheres && (
                    <Grid container spacing={2} justifyContent="center">
                        {encheres.map((auction) => (
                            <Grid item key={auction.id}>
                                <Paper variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {auction.utilisateur.pseudo}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Montant de l'enchère: {auction.montantEnchere}€
                                        </Typography>
                                        <Typography variant="body2">
                                            Date de l'enchère: {new Date(auction.dateEnchere).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
            {errors.map((error) => (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={error}
                />
            ))}

        </>
    );
};

export default ArticleDetail;
