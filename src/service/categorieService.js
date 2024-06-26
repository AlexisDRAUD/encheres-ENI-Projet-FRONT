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

const CategorieService = {

    getAllCategories: async () => {
        try {
            const response = await axios.get(`${API_URL}/categorie`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            throw error;
        }
    },
    addCategorie: async (categorie) => {
        try {
        const reponse = await axios.post(`${API_URL}/categorie/add`, categorie);
        console.error('reponse ADD:', reponse);
        } catch (error) {
            console.error('Erreur d\'enregistrement en base:', error);
            throw error;
        }
    },
    deleteCategorie: async (id) => {
        try {
        await axios.delete(`${API_URL}/categorie/delete/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression en base:', error);
            throw error;
        }
    },
};

export default CategorieService;
