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
    TextField
} from '@mui/material';
import ArticleService from '../../service/articleService';
import UtilisateurService from "../../service/utilisateurService";
import EnchereService from "../../service/enchereService";

const ArticleDetail = () => {
    const { id } = useParams();
    const [encheres, setEncheres] = useState([])
    const [article, setArticle] = useState(null);
    const [proposition, setproposition] = useState([])
    const [currentUtilisateur, setCurrentUtilisateur] = useState(null);
    const currentDate = new Date();
    const [enchere, setenchree] = useState({
        dateEnchere: "",
        montantEnchere: 0,
        utilisateur: {},
        article:{},

    });

    useEffect(() => {
        const fetchArticleAndUser = async () => {
            try {
                const fetchedArticle = await ArticleService.getdetailArticles(id);
                setArticle(fetchedArticle);
                const fetchedEnchere = await EnchereService.getAllEncheresbyarticle(fetchedArticle.id);
                setEncheres(fetchedEnchere.sort((a, b) => b.montantEnchere - a.montantEnchere));
                const fetchedUtilisateur = await UtilisateurService.getUtilisateurById("userId");
                setCurrentUtilisateur(fetchedUtilisateur);
            } catch (error) {
                console.error('Error fetching article, encheres or user:', error);
            }
        };
        fetchArticleAndUser();
    }, [id]);


    const handleSubmit = async (event) => {
        const addZero = (num) => (num < 10 ? `0${num}` : num);
        const year = currentDate.getFullYear();
        const month = addZero(currentDate.getMonth() + 1);
        const day = addZero(currentDate.getDate());
        const hours = addZero(currentDate.getHours());
        const minutes = addZero(currentDate.getMinutes());
        const secondes = addZero(currentDate.getSeconds())
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${secondes}`;
        event.preventDefault();
        enchere.article = article;
        enchere.utilisateur = currentUtilisateur;
        enchere.montantEnchere = proposition;
        enchere.dateEnchere = formattedDateTime;

        try {
            await EnchereService.addEnchere(enchere);
        } catch (error) {
            alert('Failed to add enchère: ' + error.message);
        }
        window.location.reload();
    };
    if (!article) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }
    const handleSearchChange = (event) => {
        setproposition(event.target.value);
        console.log(proposition);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
            <Typography variant="h4" gutterBottom>
                Détail de l'article
            </Typography>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Nom de l'article: {article.nomArticle}</Typography>
                <Typography variant="body1">Description: {article.description}</Typography>
                <Typography variant="body1">Date de début: {article.dateDebut}</Typography>
                <Typography variant="body1">Date de fin: {article.dateFin}</Typography>
                <Typography variant="body1">Mise à prix: {article.miseAPrix}</Typography>
                <Typography variant="body1">Prix de vente: {article.prixVente}</Typography>
                <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                <Typography variant="body1">Vendeur: {article.vendeur.pseudo}</Typography>
                {currentUtilisateur && article.vendeur.pseudo !== currentUtilisateur.pseudo && (
                    <>
                        <form onSubmit={handleSubmit} style={{width: '100%'}}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
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
            {currentUtilisateur && article.vendeur.pseudo === currentUtilisateur.pseudo && encheres && (
                <Grid container spacing={2} justifyContent="center">
                    {encheres.map((auction) => (
                        <Grid item key={auction.id} xs={12} sm={6} md={4}>
                            <Card>
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
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default ArticleDetail;
