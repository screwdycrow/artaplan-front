import api from '@/api'
import User from "@/classes/User";
import jsCookies from 'js-cookie';
import store from "../index"
import gdFiles from "@/api/gdFiles";

export default ({
    state: {
        activeUser: null,
        token: null,
        gdFolderId: null
    },
    actions: {
        logout({commit}) {
            commit('setActiveUser', null);
            commit('removeToken');
            location.reload();
        },

        changePassword({commit, state}, password) {
            commit('setLoading', true)
            return api.users.changePassword(state.activeUser.userId, password).then(
                resp => {
                    commit('setLoading', false);
                    return Promise.resolve(true);
                }
            )
        },
        /**
         *
         * @param commit
         * @return {Q.Promise<void> | Promise<postcss.Result | void> | Promise<any> | undefined}
         */
        gdGetArtaplanFolder({commit}) {
            commit('setLoading', true)
            return this._vm.$gapi.getGapiClient()
                .then(gapi => gdFiles.getMainFolder(gapi))
                .then(id => {
                    commit('setLoading', false)
                    return id;
                })
                .catch(err => {
                    if (typeof err === Array) {
                        commit('pushMessage', {type: 'danger', text: 'There are more than one Artaplan Folders'})
                        commit('setLoading', false)
                    } else {
                    }
                })
        },

        authenticate({commit, dispatch}, {username, password}) {
            commit('setLoading', true)
            return api.users.authenticateUser(username, password).then(resp => {
                commit('setLoading', false)
                const activeUser = new User(resp.user)
                dispatch({type: 'init'}, {root: true})
                commit('setToken', resp.token)
                commit('setActiveUser', activeUser)
                commit('setLoading', false, {root: true})
                commit('pushMessage', {type: 'success', text: 'Logged in '}, {root: true})
                return Promise.resolve(resp.User);
            }).catch(() => {
                commit('setLoading', false, {root: true})
                commit('pushMessage', {type: 'error', text: 'Could not authenticate, check password and username'},)
            })
        },

        getUserFromToken({commit, dispatch}) {
            let token = jsCookies.get('auth');
            commit('setLoading', true, {root: true})
            if (token) {
                commit('setToken', token);
                return api.users.getUser().then(
                    user => {
                        dispatch({type: 'init'}, {root: true})
                        commit('setActiveUser', user)
                        commit('setLoading', false, {root: true})
                        return Promise.resolve(user)
                    })
            } else {
                commit('setLoading', false, {root: true})
                return Promise.reject('noToken')
            }
        }

    },
    mutations: {
        removeToken() {
            jsCookies.remove('auth');
        },
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
        user: (s) => s.activeUser
    }
});
