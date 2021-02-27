import api from '@/api'
import User from "@/classes/User";
import jsCookies from 'js-cookie';
import store from "../index"

export default ({
    state: {
        activeUser: null,
        token: null,
    },
    actions: {
        authenticate({commit}, {username, password}) {
            return api.users.authenticateUser(username, password).then(resp => {
                const activeUser = new User(resp.user)
                commit('setToken', resp.token)
                commit('setActiveUser', activeUser)
                commit('setLoading',false,{root:true})
                return Promise.resolve(resp.User);
            })
        },

        getUserFromToken({commit}) {
            let token = jsCookies.get('auth');
            if (token) {
                commit('setToken', token);
                return api.users.getUser().then(
                    user => {
                        commit('setActiveUser', user)
                        commit('setLoading',false,{root:true})
                        return Promise.resolve(user)
                    })
            } else {
                commit('setLoading',false,{root:true})
                return Promise.reject('noToken')
            }
        }

    },
    mutations: {
        setToken(state, token) {
            jsCookies.remove('auth');
            jsCookies.set('auth', token, {expires: 30})
            state.token = token;
        },
        setActiveUser(state, activeUser) {
            state.activeUser = activeUser;
        }


    },
    getters: {
        isAuthenticated: (s) => {
            return s.token !== null && s.activeUser !== null
        },
        token: (s) => s.token,
        user:(s)=>s.activeUser
    }
});
