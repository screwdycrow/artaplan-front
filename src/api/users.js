import axios from './axios'
import User from "@/classes/User";

export default {
    registerUser(user, password) {
        user.setPassword(password)
       return  axios.post('/Users/register', user)
            .then(resp => Promise.resolve(true))
    },
    authenticateUser(username, password) {
        return axios.post( '/Users/authenticate', {username: username, password: password})
            .then(resp => resp.data)
    },
    getUser() {
        return axios.get('/Users/current').then(resp => new User (resp.data));
    },
    changePassword( userId, password) {
        return axios.post( '/Users/changePassword/'+userId, {password: password})
            .then(resp => resp.data)
    }
}
