import axios from 'axios';

const API_URL = 'http://localhost:8080';
const key = JSON.parse(sessionStorage.getItem('user'));

if (key) {
    axios.interceptors.request.use(function (config) {

        config.headers.Authorization =  ("Bearer " + key.accessToken);

        return config;
    });
}


const SearchService = {
    Search: async (pageNum) => {
        const filter = JSON.parse(sessionStorage.getItem("filters"));
        try {
            console.log(pageNum)
            const response = await axios.post(`${API_URL}/article/${pageNum}`, filter);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l Enchere:', error);
            return error.response.data;
        }
    },
};

export default SearchService;
