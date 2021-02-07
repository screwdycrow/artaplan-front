import axios from 'axios';
import store from '../store'
import config from '../config'

let host = config.host;
let instance = axios.create({
    baseURL: host,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => ({
    ...config,
    headers: {
        Authorization: 'Bearer ' + store.getters['token'] || "",
        ...config.headers
    }
}));
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    store.commit('setLoading',false)
    return Promise.reject(error);
});
export default instance;
