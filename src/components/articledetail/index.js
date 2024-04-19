import {Button, Grid, TextField, Typography, useMediaQuery, useTheme, Card, CardMedia, CardContent} from "@mui/material";
import React from "react";

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString();
    const min = date.getMinutes().toString();
    return `${year}/${month}/${day}/${hours}/${min}`;
};


const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const isDateBeforeCurrentDate = (articleDateFin, currentDate) => {
    const articleDate = new Date(articleDateFin);
    const current = new Date(currentDate);
    return articleDate <= current;
};

const RenderArticleDetails = ({currentUtilisateur, article, encheres, handleSubmit, proposition, handleSearchChange, }) => {
    const currentDate = new Date();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const venteAnnulee = !encheres || encheres.length === 0;

    const isConnected = () => {
        const user = sessionStorage.getItem("user");
        return user !== null;
    };
    console.log('date du jour : ' , formatDateTime(currentDate) , 'date de fin  : ',formatDateTime(article.dateFin) )
    return (
        <Grid item xs={12} sm={8}>
            {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && isDateBeforeCurrentDate(article.dateFin, currentDate) && encheres && (
                <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h4">{article.acheteur.username} a remporté l'enchère</Typography>
            )}
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h6">{article.nomArticle}</Typography>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={article.img ? article.img : 'grey'}
                            alt="Image de l'article"
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">Description: {article.description}</Typography>
                            <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                            {encheres.length > 0 ? (
                                <Typography variant="body1">Meilleure offre: {encheres[0].montantEnchere}€ par {encheres[0].utilisateur.username}</Typography>
                            ) : (
                                <Typography variant="body1">Aucune offre pour le moment</Typography>
                            )}
                            <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                            <Typography variant="body1">Fin de l'enchère : {formatDate(article.dateFin)}</Typography>
                            <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {isConnected() && currentUtilisateur && article.vendeur.id !== currentUtilisateur.id && formatDateTime(article.dateFin) >= formatDateTime(currentDate) && formatDateTime(article.dateDebut) <= formatDateTime(currentDate) && (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            )}
        </Grid>
    );
};

export default RenderArticleDetails;
