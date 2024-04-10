import axios from 'axios';

const API_URL = 'http://localhost:8080';
const key = JSON.parse(sessionStorage.getItem('user'));

if (key) {
    axios.interceptors.request.use(function (config) {

        config.headers.Authorization =  ("Bearer " + key.accessToken);

        return config;
    });
}


const EnchereService = {
    getAllEncheres: async () => {
        try {
            const response = await axios.get(`${API_URL}/enchere`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des Encheres:', error);
            throw error;
        }
    },
    addEnchere: async (Enchere) => {
        try {
            await axios.post(`${API_URL}/enchere/add`, Enchere);
        } catch (error) {
            console.error('Erreur lors de la création de l Enchere:', error);
            throw error;
        }
    },
};

export default EnchereService;
