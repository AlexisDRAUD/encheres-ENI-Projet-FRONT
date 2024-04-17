import axios from 'axios';
import {useState} from "react";
import IP from "../type/data";

const API_URL = IP.serverip;

const key = JSON.parse(sessionStorage.getItem('user'));

if (key) {
    axios.interceptors.request.use(function (config) {

        config.headers.Authorization =  ("Bearer " + key.accessToken);

        return config;
    });
}

const UtilisateurService = {

    getUtilisateurById: async () => {
        if (key){
            try {
                const response = await axios.get(`${API_URL}/user/${key.id}`);
                return response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur:', error);
                throw error;
            }
        } else {
            return {}
        }

    },

    getUtilisateurs: async () => {
        if (key){
            try {
                const response = await axios.get(`${API_URL}/user`);
                return response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                throw error;
            }
        } else {
            return {}
        }
    },

    getUtilisateursDesactive: async () => {
        if (key){
            try {
                const response = await axios.get(`${API_URL}/user/disabled`);
                return response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                throw error;
            }
        } else {
            return {}
        }
    },

    addUser: async(utilisateur) => {
        try {
            await axios.post(`${API_URL}/auth/signup`, utilisateur);
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            return error.response.data;
        }
    },

    updateUser: async(utilisateur) => {
        if (key) {
            try {
                await axios.put(`${API_URL}/user/${key.id}`, utilisateur);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur:', error);
                return error.response.data;
            }
        }else {
            return {}
        }
    },

    deleteUserByAdmin: async(id) => {
        if (key) {
            try {
                await axios.delete(`${API_URL}/user/${id}/${false}`);
            } catch (error) {
                console.error('Erreur lors de la supprission de l\'utilisateur:', error);
                throw error;
            }
        }else {
            return {}
        }
    },

    deleteUser: async() => {
        if (key) {
            try {
                await axios.delete(`${API_URL}/user/${key.id}/${false}`);
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
                throw error;
            }
        }else {
            return {}
        }
    },

    desactiverUserByAdmin: async(id) => {
        if (key) {
            try {
                await axios.delete(`${API_URL}/user/${id}/${true}`);
            } catch (error) {
                console.error('Erreur lors de la supprission de l\'utilisateur:', error);
                throw error;
            }
        }else {
            return {}
        }
    },

    reactiverUserByAdmin: async(id) => {
        if (key) {
            try {
                await axios.delete(`${API_URL}/user/reactiver/${id}`);
            } catch (error) {
                console.error('Erreur lors de la supprission de l\'utilisateur:', error);
                throw error;
            }
        }else {
            return {}
        }
    }
};

export default UtilisateurService;
