import axios from 'axios';

const API_URL = 'http://localhost:8080';
const key = JSON.parse(localStorage.getItem('user'));

if (key) {
    axios.interceptors.request.use(function (config) {

        config.headers.Authorization =  ("Bearer " + key.accessToken);

        return config;
    });
}


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
    addArticle: async (article, file) => {
        const formData = new FormData();
        formData.append('article', JSON.stringify(article));
        formData.append('file', file);

        try {
            const response = await axios.post(`${API_URL}/article/add`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'article:', error);
            throw error;
        }
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
