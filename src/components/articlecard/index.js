import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";




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

const Articlecard = ({ article}) => {
    const [date] = useState(new Date(Date.now()));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const key = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
        {isMobile && (
                <Grid item key={article.id} xs={12} sm={6} md={5} lg={5}>
                    <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <div>
                                            {article.img ? (
                                                <div>
                                                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                                    <img
                                                        src={article.img}
                                                        alt="Image de l'article"
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            objectFit: 'cover',
                                                            backgroundColor: '#ffffff'
                                                        }}
                                                    />
                                                </div>

                                            ) : (
                                                <div style={{
                                                    width: '100px',
                                                    height: '27px',
                                                    paddingTop: '100%',
                                                    backgroundColor: 'grey'
                                                }}></div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography gutterBottom variant="h5" component="div"
                                                    style={{ textDecoration: 'underline' }}>
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
                                        {(formatDateTime(article.dateDebut) > formatDateTime(date) && key && article.vendeur.id === key.id)
                                            ? (<Link to={`/article/${article.id}/edit_or_delete`}>Modifier</Link>)
                                            : (<></>)
                                        }
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            )}
            {!isMobile && (
            <Grid item key={article.id} xs={12} sm={6} md={5} lg={5}>
                <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <div>
                                        {article.img ? (
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                                <img
                                                    src={article.img}
                                                    alt="Image de l'article"
                                                    style={{
                                                        maxWidth: '190px',
                                                        minWidth: '190px',
                                                        height: '200px',
                                                        objectFit: 'cover',
                                                        backgroundColor: '#ffffff'
                                                    }}
                                                />
                                            </div>

                                        ) : (
                                            <div style={{
                                                maxWidth: '190px',
                                                minWidth: '190px',
                                                height: '27px',
                                                paddingTop: '100%',
                                                backgroundColor: 'grey'
                                            }}></div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography gutterBottom variant="h5" component="div"
                                                style={{ textDecoration: 'underline' }}>
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
                                    {(formatDateTime(article.dateDebut) > formatDateTime(date) && key && article.vendeur.id === key.id)
                                        ? (<Link to={`/article/${article.id}/edit_or_delete`}>Modifier</Link>)
                                        : (<></>)
                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
            )}
        </>

    );
}

export default Articlecard;