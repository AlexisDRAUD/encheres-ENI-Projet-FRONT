import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {CircularProgress, Box,useMediaQuery, useTheme} from '@mui/material';
import ArticleService from '../../service/articleService';
import UtilisateurService from "../../service/utilisateurService";
import EnchereService from "../../service/enchereService";
import Navbar from "../../components/navbar";
import Mobileview from "./view/mobileview";
import Computerview from "./view/computerview";

const ArticleDetail = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();
    const currentDate = new Date();

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
            <div style={{ padding: '80px' }}>
                {isMobile && (
                    <Mobileview
                        article={article}
                        encheres={encheres}
                        currentUtilisateur={currentUtilisateur}
                        currentDate={currentDate}
                    />
                    )}
                {!isMobile && (
                    <Computerview
                        article={article}
                        encheres={encheres}
                        currentUtilisateur={currentUtilisateur}
                        currentDate={currentDate}
                    />
                )}
            </div>
        </>
    );



};
export default ArticleDetail;
