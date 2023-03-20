import axios from "axios";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


class AuthService {

    signup(user_id, username) {
        return axios
            .post(API_URL + "api/auth/signup", {
                user_id, username,
            }, {
                withCredentials: true,
            })
    }

    signin(user_id) {
        return axios
            .post(API_URL + "api/auth/signin", {
                user_id,
            }, {
                withCredentials: true,
            })
    }

    signout() {
        Cookies.remove('accessToken', {
            path: '/',
            domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'yourdomain.com',
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict'
        });
    }

createProfile(user_id, name, phone, bank_number, bank_name) {
    return axios
        .post(API_URL + "api/profile/create", {
            user_id: user_id, name, phone, bank_number, bank_name
        }, {
            withCredentials: true,
        })
}

verifyAuth(user_id) {
    return axios.post(API_URL + "api/auth/verify", {
        user_id: user_id
    }, {
        withCredentials: true
    });
}

getProfile(user_id) {
    return axios.get(API_URL + "api/profile/get", {
        params: { user_id: user_id },
        withCredentials: true
    });
}
}
export default new AuthService();