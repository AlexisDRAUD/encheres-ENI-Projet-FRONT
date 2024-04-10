import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, CircularProgress, Box, Button } from '@mui/material';
import ArticleService from '../../service/articleService';
import UtilisateurService from "../../service/utilisateurService";

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [currentUtilisateur, setCurrentUtilisateur] = useState(null); // Initially null, assuming user might not be loaded yet

    useEffect(() => {
        const fetchArticleAndUser = async () => {
            try {
                const fetchedArticle = await ArticleService.getdetailArticles(id);
                setArticle(fetchedArticle);
                const userId = "currentUserId";
                const fetchedUtilisateur = await UtilisateurService.getUtilisateurById(userId);
                setCurrentUtilisateur(fetchedUtilisateur);
            } catch (error) {
                console.error('Error fetching article or user:', error);
            }
        };

        fetchArticleAndUser();
    }, [id]); // Depend on the `id` to refetch when it changes

    if (!article) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

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
                    <Button variant="contained">Enchérir</Button>
                )}
            </Grid>
        </Grid>
    );
};

export default ArticleDetail;
