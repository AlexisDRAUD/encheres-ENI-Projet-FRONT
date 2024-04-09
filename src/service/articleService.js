import axios from 'axios';

const API_URL = 'http://localhost:8080';

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
};

export default ArticleService;
