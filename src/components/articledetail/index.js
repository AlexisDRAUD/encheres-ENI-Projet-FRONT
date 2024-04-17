import {Button, Grid, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import React from "react";

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${day}/${month}/${year}/${hours}/${min}`;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


const RenderArticleDetails = ({currentUtilisateur, article, encheres, handleSubmit, proposition, handleSearchChange, }) => {
    const currentDate = new Date();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isConnected = () => {
        const user = sessionStorage.getItem("user");
        return user !== null;
    };
    return (
        <Grid item xs={12} sm={8}>
            {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && formatDateTime(article.dateFin) < formatDateTime(currentDate) && encheres && (
                <>
                    <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h4">{article.acheteur.username} a remporté l'enchère</Typography>
                </>
            )}
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h6">{article.nomArticle}</Typography>
            {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && formatDateTime(article.dateFin) < formatDateTime(currentDate) && encheres && (
                <>
                    <Grid container justifyContent="center" style={{ display: "flex" }}>
                        <Grid item xs={4}>
                            <div>
                                {article.img ? (
                                    <div>
                                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                        <img src={article.img} alt="Image de l'article" style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', height: 0, paddingTop: '100%', backgroundColor: 'grey' }}></div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div >
                                <Typography variant="body1">Description: {article.description}</Typography>
                                <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                                <Typography variant="body1">Meilleure offre: {encheres.length > 0 ? `${encheres[0].montantEnchere}€ par ${encheres[0].utilisateur.username}` : "Aucune offre pour le moment"}</Typography>
                                <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                                <Typography variant="body1">Fin de l'enchère : {formatDate(article.dateFin)}</Typography>
                                <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </>
            )}
            {!currentUtilisateur || article.vendeur.id !== currentUtilisateur.id || formatDateTime(article.dateFin) >= formatDateTime(currentDate) || !encheres ? (
                <Grid item xs={4}>
                    <div>
                        {article.img ? (
                            <div>
                                {isMobile && (
                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                    <img src={article.img} alt="Image de l'article"
                                         style={{width: '300%', height: 'auto'}}/>
                                )}
                                {!isMobile && (
                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                    <img src={article.img} alt="Image de l'article"
                                         style={{width: '100%', height: 'auto'}}/>
                                )}

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
            ) : null}
            {!currentUtilisateur || article.vendeur.id !== currentUtilisateur.id || formatDateTime(article.dateFin) >= formatDateTime(currentDate) || !encheres ? (
                <>
                    <Typography variant="body1">Description: {article.description}</Typography>
                    <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                    <Typography variant="body1">Meilleure offre: {encheres.length > 0 ? `${encheres[0].montantEnchere}€ par ${encheres[0].utilisateur.username}` : "Aucune offre pour le moment"}</Typography>
                    <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                    <Typography variant="body1">Fin de l'enchère : {formatDate(article.dateFin)}</Typography>
                    <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>
                </>
            ) : null}
            {isConnected() && currentUtilisateur && article.vendeur.id !== currentUtilisateur.id && formatDateTime(article.dateFin) > formatDateTime(currentDate) && formatDateTime(article.dateDebut) < formatDateTime(currentDate) && (
                <>
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
                </>
            )}
        </Grid>
    );
};

export default RenderArticleDetails;
