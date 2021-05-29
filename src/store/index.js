import Vue from 'vue'
import Vuex from 'vuex'
import slotModule from "@/store/modules/slotModule";
import jobModule from "@/store/modules/jobModule";
import stageModule from "./modules/stageModule"
import scheduleModule from "@/store/modules/scheduleModule";
import customerModule from "@/store/modules/customerModule";
import userModule from "@/store/modules/userModule";
import moment from 'moment'
import timeLogModule from "@/store/modules/timeLogModule";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isMobile: false,
        isLoading: false,
        activeMessages: [],

    },
    mutations: {

        setLoading(state, value) {
            state.isLoading = value
        },
        pushMessage(state, {type, text}) {
            state.activeMessages.push({
                date: moment().format('DD/MM hh:mm:ss'),
                active: true,
                type: type,
                text: text,
            });
        },
        removeMessage(state, message) {
            const index = state.activeMessages.findIndex(m => m.date === message.date);
            state.activeMessages.splice(index, 1)
        },
    },
    actions: {
        init({commit, state, dispatch}) {
            commit('timeLogs/loadFromLocal')
            if (state.timeLogs.timeLogNow !== null) {
                if (confirm('You had one time logging running. It is on pause now. Do you want to resume it?')) {
                    commit('timeLogs/startTimer')
                }
            }
        }
    },
    getters: {
        activeMessages: (s) => s.activeMessages
    },
    modules: {
        schedule: scheduleModule,
        slots: slotModule,
        jobs: jobModule,
        stages: stageModule,
        customers: customerModule,
        users: userModule,
        timeLogs: timeLogModule
    }
})
