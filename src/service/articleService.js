import axios from 'axios';
import IP from "../type/data";

const API_URL = IP.serverip;
const key = JSON.parse(sessionStorage.getItem('user'));

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
    addArticle: async (article) => {
        try {
            await axios.post(`${API_URL}/article/add`, article);
        } catch (error) {
            console.error('Erreur lors de la création de l article:', error);
            throw error;
        }
    },
    updateArticle: async (article) => {
        try {
            await axios.put(`${API_URL}/article/${article.id}`, article);
        } catch (error) {
            console.error('Erreur lors de la modification de l article:', error);
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
    getArticleForUpdate: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/article/modif/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des donné de l'articles pour modification:", error);
            throw error;
        }
    },

    deleteArticle: async (id) => {
        try {
            await axios.delete(`${API_URL}/article/delete/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression en base:', error);
            throw error;
        }
    },
    updateArticleRetire: async (article) => {
        try {
            await axios.put(`${API_URL}/article/${article.id}/retire`);
        } catch (error) {
            console.error('Erreur lors de la modification de l article:', error);
            throw error;
        }
    },
};

export default ArticleService;
