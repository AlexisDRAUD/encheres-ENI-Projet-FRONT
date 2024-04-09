import axios from 'axios';

const API_URL = 'http://localhost:8080';

const UtilisateurService = {
    getUtilisateurById: async () => {
        try {
            const response = await axios.get(`${API_URL}/user/10`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            throw error;
        }
    },

    updateUser: async(utilisateur) => {
        try {
            await axios.put(`${API_URL}/user/10`, utilisateur);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            throw error;
        }
    }
};

export default UtilisateurService;
