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
        logout({commit}){
          commit('setActiveUser',null);
          commit('removeToken');
        },
        authenticate({commit}, {username, password}) {
            commit('setLoading',true)
            return api.users.authenticateUser(username, password).then(resp => {
                commit('setLoading',false)
                const activeUser = new User(resp.user)
                commit('setToken', resp.token)
                commit('setActiveUser', activeUser)
                commit('setLoading',false,{root:true})
                commit('pushtMessage',{type:'success',text:'Logged in '},{root:true})
                return Promise.resolve(resp.User);
            }).catch(()=>{
                commit('setLoading',false,{root:true})
                commit('pushMessage',{type:'error',text:'Could not authenticate, check password and username'},)
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
                commit('setLoading', false, {root: true})
                return Promise.reject('noToken')
            }
        }

    },
    mutations: {
        removeToken(){
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
        user:(s)=>s.activeUser
    }
});
