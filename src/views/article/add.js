import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Grid, Card, CardContent
} from '@mui/material';
import ArticleService from "../../service/articleService";
import CategorieService from "../../service/categorieService";
import UtilisateurService from "../../service/utilisateurService";
import Navbar from "../../components/navbar";
import axios from "axios";

const CreateArticleForm = () => {
    const key = JSON.parse(sessionStorage.getItem('user'));
    const [utilisateur, setUtilisateur] = useState({});
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [article, setArticle] = useState({
        nomArticle: "",
        description: "",
        dateDebut: '',
        dateFin: '',
        miseAPrix: '',
        prixVente: '',
        categorieId: "",
        vendeurId: "",
        rue: "",
        codePostal: "",
        ville: "",
        img: ""
    });

    useEffect(() => {
        const fetchResources = async () => {
            const categoriesData = await CategorieService.getAllCategories();
            setCategories(categoriesData);
            const utilisateurData = await UtilisateurService.getUtilisateurById(key.id);
            setUtilisateur(utilisateurData);
        };
        fetchResources();
    }, []);

    useEffect(() => {
        setArticle((prevArticle) => ({
            ...prevArticle, rue: utilisateur.rue, codePostal: utilisateur.codePostal, ville: utilisateur.ville
        }));
    }, [utilisateur]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    };

    const handleFileChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Veuillez sélectionner un fichier');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        try {
            article.vendeurId = utilisateur.id;
            article.prixVente = article.miseAPrix;
            article.img = ('http://localhost:8080/upload/' + file.name);
            await axios.post('http://localhost:8080/upload', formData);
            await ArticleService.addArticle(article);
            alert('Article added successfully!');
            window.location.replace("/");
        } catch (error) {
            alert('Failed to add article: ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '80px' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                    <Typography variant="h4" gutterBottom>
                        Créer un nouvel article
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Card variant="outlined">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Détails de l'article
                                        </Typography>
                                        <TextField fullWidth label="Nom de l'article" name="nomArticle" value={article.nomArticle} onChange={handleChange} margin="normal" />
                                        <TextField fullWidth label="Description" name="description" value={article.description} onChange={handleChange} margin="normal" />
                                        <TextField fullWidth type="datetime-local" label="Date de début" name="dateDebut" value={article.dateDebut} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                                        <TextField fullWidth type="datetime-local" label="Date de fin" name="dateFin" value={article.dateFin} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                                        <TextField fullWidth label="Mise à prix" name="miseAPrix" type="number" value={article.miseAPrix} onChange={handleChange} margin="normal" />
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="category-label">Catégorie</InputLabel>
                                            <Select labelId="category-label" id="categorie-select" value={article.categorieId} name="categorieId" onChange={handleChange} label="Catégorie">
                                                <MenuItem value=""><em>Aucune</em></MenuItem>
                                                {categories.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>{category.libelle}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                                    {imagePreviewUrl && (
                                        <img src={imagePreviewUrl} alt="Aperçu de l'image" style={{ maxWidth: '100%', maxHeight: '600px' }} />
                                    )}
                                </Grid>
                            </Grid>
                        </Card>
                        <Card variant="outlined" sx={{ mt: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Informations de localisation
                                </Typography>
                                <TextField fullWidth type="text" label="Rue" name="rue" value={article.rue} onChange={handleChange} margin="normal" />
                                <TextField fullWidth type="text" label="Code postal" name="codePostal" value={article.codePostal} onChange={handleChange} margin="normal" />
                                <TextField fullWidth type="text" label="Ville" name="ville" value={article.ville} onChange={handleChange} margin="normal" />
                            </CardContent>
                        </Card>
                        <Card variant="outlined" sx={{ mt: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Autres
                                </Typography>
                                <Typography>Photo de l'article</Typography>
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span" variant="contained">Upload file</Button>
                                </label>
                            </CardContent>
                        </Card>
                        <Button type="submit" variant="contained" color="primary">
                            Ajouter
                        </Button>
                    </form>
                </Grid>
            </div>
        </>
    );
};

export default CreateArticleForm;
