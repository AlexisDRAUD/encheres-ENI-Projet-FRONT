import axios from 'axios';

const API_URL = 'http://localhost:8080';
const key = JSON.parse(localStorage.getItem('user'));

axios.interceptors.request.use(function (config) {

    config.headers.Authorization =  ("Bearer " + key);

    return config;
});

const ArticleService = {
    getAllArticles: async () => {
        try {
            const response = await axios.get(`${API_URL}/article`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error);
            throw error;
        }
    },
    addArticle: async (article) => {
        const response = await fetch('http://localhost:8080/article/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Error adding article');
        }

        return await response.json();
    },
    getdetailArticles: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/article/detail/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des donné de l'articles:", error);
            throw error;
        }
    },
};

export default ArticleService;
