import axios from 'axios';

const API_URL = 'http://localhost:8080';
const key = JSON.parse(sessionStorage.getItem('user'));

if (key) {
    axios.interceptors.request.use(function (config) {

        config.headers.Authorization =  ("Bearer " + key.accessToken);

        return config;
    });
}

const CategorieService = {
    getAllCategories: async () => {
        try {
            const response = await axios.get(`${API_URL}/categorie`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error);
            throw error;
        }
    },
};

export default CategorieService;
