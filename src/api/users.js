import axios from './axios'
import User from "@/classes/User";

export default {
    registerUser(user, password) {
        user.setPassword(password)
        axios.post('/Users/register', user)
            .then(resp => resp)
    },
    authenticateUser(username, password) {
        return axios.post( '/Users/authenticate', {username: username, password: password})
            .then(resp => resp.data)
    },
    getUser() {
        return axios.get('/Users/current').then(resp => new User (resp.data));
    }
}
