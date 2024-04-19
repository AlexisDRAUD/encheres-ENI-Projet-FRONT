import React, {useEffect, useState} from 'react';
import {
    Typography,
    Grid,
    CardContent,
    Snackbar, Button,
} from '@mui/material';import Paper from "@mui/material/Paper";
import EnchereService from "../../../service/enchereService";
import ArticleService from "../../../service/articleService";
import UtilisateurService from "../../../service/utilisateurService";
import RenderArticleDetails from "../../../components/articledetail"; // Remplace 'articledetail' par 'RenderArticleDetails'

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${min}`;
};

const isDateBeforeCurrentDate = (articleDateFin, currentDate) => {
    const articleDate = new Date(articleDateFin);
    const current = new Date(currentDate);
    return articleDate <= current;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
const MobileView = ({ article, encheres, currentUtilisateur, currentDate }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [proposition, setProposition] = useState("");
    const [errors, setErrors] = useState([]);
    const [isActive, setIsActive] = useState(true);
    useEffect(() => {
        if (article && currentUtilisateur) {
            if (article.acheteur && article.acheteur.id === currentUtilisateur.id) {
                setIsActive(!article.acheteurRetire);
            } else {
                setIsActive(!article.vendeurRetire);
            }
        }
    }, [article, currentUtilisateur]);

    const handleClick = async () => {
        await ArticleService.updateArticleRetire(article);
        window.location.reload();
    }

    const handleSearchChange = (event) => {
        setProposition(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        currentDate.addHours(2)

        const formattedDateTime = currentDate.toISOString();

        const enchere = { // Utilisation de la variable locale enchere au lieu de useState
            dateEnchere: formattedDateTime,
            montantEnchere: proposition,
            userId: currentUtilisateur.id,
            articleId: article.id,
        };

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
                    setErrors(['Enchère créée avec succès']);
                    setOpenSnackbar(true);
                }
            } else {
                setErrors(['Enchère créée avec succès']);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setErrors(['Une erreur s\'est produite lors de l\'ajout de l\'enchère']);
            setOpenSnackbar(true);
        } finally {
            const fetchedArticle = await ArticleService.getdetailArticles(article.id);
            const fetchedUtilisateur = await UtilisateurService.getUtilisateurById(currentUtilisateur.id);
            const fetchedEnchere = await EnchereService.getAllEncheresbyarticle(fetchedArticle.id);
            article = (fetchedArticle);
            currentUtilisateur = (fetchedUtilisateur);
            encheres = (fetchedEnchere.sort((a, b) => b.montantEnchere - a.montantEnchere));
            setProposition("");
            window.location.replace('/')
        }
    };

    return (
        <>
            <Grid container spacing={3} justifyContent="center">
                {article && currentUtilisateur && isDateBeforeCurrentDate(article.dateFin, currentDate) && article.acheteur.id === currentUtilisateur.id? (
                    article.acheteur && article.acheteur.id === currentUtilisateur.id ? (
                        <>
                        <Grid item xs={12} sm={8}>
                            <Grid container justifyContent="center" style={{ display: "flex" }}>
                                <Typography variant="h6">Vous avez remporté la vente</Typography>
                            </Grid>
                            <Grid container justifyContent="center" style={{ display: "flex" }}>
                                <Typography variant="h5">{article.nomArticle}</Typography>
                            </Grid>
                            <Grid container justifyContent="center" style={{ display: "flex" }}>
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
                                <Typography variant="body1">Description: {article.description}</Typography>
                                <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                                <Typography variant="body1">Meilleure offre: {encheres.length > 0 ? `${encheres[0].montantEnchere}€ par ${encheres[0].utilisateur.username}` : "Aucune offre pour le moment"}</Typography>
                                <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                                <Typography variant="body1">Fin de l'enchère : {formatDate(article.dateFin)}</Typography>
                                <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>
                            </Grid>
                            <Button onClick={handleClick} disabled={!isActive} variant={'outlined'}>
                                Retrait
                            </Button>
                        </Grid>
                    </>
                    ) : (
                        <>
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{ textAlign: 'center' }}>La vente n'a pas abouti</Typography>
                        </Grid>
                    <Grid container justifyContent="center" style={{ display: "flex" }}>
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
                        <Typography variant="body1">Description: {article.description}</Typography>
                        <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                        <Typography variant="body1">Meilleure offre: {encheres.length > 0 ? `${encheres[0].montantEnchere}€ par ${encheres[0].utilisateur.username}` : "Aucune offre pour le moment"}</Typography>
                        <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                        <Typography variant="body1">Fin de l'enchère : {formatDate(article.dateFin)}</Typography>
                        <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>
                    </Grid>
                        </>
                    )
                ) : (
                    <>
                        <RenderArticleDetails
                            currentUtilisateur={currentUtilisateur}
                            article={article}
                            encheres={encheres}
                            handleSubmit={handleSubmit}
                            proposition={proposition}
                            handleSearchChange={handleSearchChange}
                        />
                        {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && isDateBeforeCurrentDate(article.dateFin, currentDate) && encheres && (
                            <Button onClick={handleClick} disabled={!isActive} variant="outlined">
                                Retrait
                            </Button>
                        )}
                    </>
                )}
                {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && encheres && formatDateTime(article.dateFin) >= formatDateTime(currentDate) && (
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
                {errors.map((error, index) => (
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={() => setOpenSnackbar(false)}
                        message={error}
                        key={index}
                    />
                ))}
            </Grid>
        </>
    );
};

export default MobileView;
