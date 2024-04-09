import axios from 'axios';

const API_URL = 'http://localhost:8080';

const key = JSON.parse(localStorage.getItem('user'));

axios.interceptors.request.use(function (config) {

    config.headers.Authorization =  ("Bearer " + key);

    return config;
});


const UtilisateurService = {
    getUtilisateurById: async () => {
        try {
            const response = await axios.get(`${API_URL}/user/17`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            throw error;
        }
    },

    updateUser: async(utilisateur) => {
        try {
            await axios.put(`${API_URL}/user/2`, utilisateur);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            throw error;
        }
    },

    deleteUser: async() => {
        try {
            await axios.delete(`${API_URL}/user/2`);
        } catch (error) {
            console.error('Erreur lors de la supprission de l\'utilisateur:', error);
            throw error;
        }
    }
};

export default UtilisateurService;
