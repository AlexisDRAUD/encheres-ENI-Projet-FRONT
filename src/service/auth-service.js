import axios from "axios";
import IP from "../type/data";


const API_URL = IP.serverip+"/auth";


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/signin", {
                username: username,
                password: password
            })
            .then(response => {
                if (response.data) {
                    const data = {
                        id : response.data.id,
                        accessToken : response.data.accessToken
                    }
                    if (response.data.admin){
                        data.admin = true
                    }
                    sessionStorage.setItem("user", JSON.stringify(data));
                }

                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "/signup", {
            username: username,
            email: email,
            password: password
        });
    }

    async forgottenPass(email) {
        try {
            await axios.post(API_URL + "/resetPassword?email=" + email, {});
        } catch (error) {
            return error.response.data;
        }
    }

    async savePass(password, passwordConfirmation, token) {
        try {
            await axios.post(API_URL + "/savePassword", {
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
