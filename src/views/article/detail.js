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
    Snackbar, MenuItem, Alert, useMediaQuery, useTheme
} from '@mui/material';
import ArticleService from '../../service/articleService';
import UtilisateurService from "../../service/utilisateurService";
import EnchereService from "../../service/enchereService";
import Paper from "@mui/material/Paper";
import Navbar from "../../components/navbar";
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles(theme => ({
    imagePlaceholder: {
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        color: '#1e1d1d',
        fontSize: '1.2rem'
    },
    imageStyle: {
        width: '20%',
        height: 'auto'
    }
}));

const ArticleDetail = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

    const handleRetraitEffectue = (event) => {
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

                }
            }else {
                setErrors(['Enchère créée avec succès']);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enchère:', error);
            setErrors(['Une erreur s\'est produite lors de l\'ajout de l\'enchère']);
            setOpenSnackbar(true);
        } finally {
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
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours();
        const min = date.getMinutes();
        return `${day}/${month}/${year}/${hours}/${min}`;
    };

    if (!article) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    const RenderArticleDetails = () => (
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
            ) : null}
            {!currentUtilisateur || article.vendeur.id !== currentUtilisateur.id || formatDateTime(article.dateFin) >= formatDateTime(currentDate) || !encheres ? (
                <>
                    <Typography variant="body1">Description: {article.description}</Typography>
                    <Typography variant="body1">Catégorie: {article.categorie.libelle}</Typography>
                    <Typography variant="body1">Meilleure offre: {encheres.length > 0 ? `${encheres[0].montantEnchere}€ par ${encheres[0].utilisateur.username}` : "Aucune offre pour le moment"}</Typography>
                    <Typography variant="body1">Mise à prix: {article.miseAPrix}€</Typography>
                    <Typography variant="body1">Fin de l'enchère : {formatDateTime(article.dateFin)}</Typography>
                    {!isMobile && <Typography variant="body1">Retrait : {article.retrait.rue} {article.retrait.codePostal} {article.retrait.ville}</Typography>}
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

    return (
        <>
            <Navbar />
            <div style={{ padding: '80px' }}>

            <Grid container spacing={3} justifyContent="center">
                {article && currentUtilisateur && formatDateTime(article.dateFin) < formatDateTime(currentDate) && article.acheteur.id === currentUtilisateur.id ? (
                    <>
                        <Grid item xs={12} sm={8}>
                            <Grid container justifyContent="center" style={{ display: "flex" }}>
                                <Typography variant="h6">Vous avez remporté la vente</Typography>
                            </Grid>
                            {!isMobile && (
                                <Grid container justifyContent="center" style={{ display: "flex" }}>
                                    <Typography variant="h4">{article.nomArticle}</Typography>
                                </Grid>
                            )}
                            {isMobile && (
                                <Grid container justifyContent="center" style={{ display: "flex" }}>
                                    <Typography variant="h5">{article.nomArticle}</Typography>
                                </Grid>
                            )}
                            {!isMobile && (
                                <Grid container justifyContent="center" style={{ display: "flex" }}>
                                    <Grid item xs={4}>
                                        <div>
                                            {article.img ? (
                                                <div>
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
                            )}
                            {isMobile && (
                                <Grid container justifyContent="center" style={{ display: "flex" }}>
                                    <div>
                                        {article.img ? (
                                            <div>
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
                            )}
                        </Grid>
                    </>
                ) : <RenderArticleDetails />}
                {currentUtilisateur && article.vendeur.id === currentUtilisateur.id && encheres && formatDateTime(article.dateFin) > formatDateTime(currentDate) && (
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
                    key={error}
                />
            ))}
            </div>
        </>
    );



};

export default ArticleDetail;
