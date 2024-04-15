import axios from "axios";


const API_URL = "http://localhost:8080/auth/";


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username: username,
                password: password
            })
            .then(response => {
                if (response.data) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username: username,
            email: email,
            password: password
        });
    }

    async forgottenPass(email) {
        try {
            await axios.post(API_URL + "resetPassword?email=" + email, {});
        } catch (error) {
            return error.response.data;
        }
    }

    async savePass(password, passwordConfirmation, token) {
        try {
            await axios.post(API_URL + "savePassword", {
                password: password,
                passwordConfirmation: passwordConfirmation,
                token: token
            });
        } catch (error) {
            return error.response.data;
        }
    }

    getCurrentUser(){
        return JSON.parse(sessionStorage.getItem('user'));
    }
}

export default new AuthService();
