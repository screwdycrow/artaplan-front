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
        settings: {
            darkMode: false
        }

    },
    mutations: {
        setSettings(state, settings) {
            state.settings = settings;
        },
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
        notify({state}, message) {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                var notification = new Notification(message);
            }

            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        var notification = new Notification(message);
                    }
                });
            }
        },
        getSettings({commit, dispatch, state}) {
            let settings = localStorage.getItem('settings');
            if (settings) {
                commit('setSettings', JSON.parse(settings))
            } else {
                dispatch('saveSettings', state.settings)
            }
        },
        saveSettings({state}) {
            localStorage.setItem('settings', JSON.stringify(state.settings));
        },
        init({commit, state, dispatch}) {
            commit('timeLogs/loadFromLocal')
            dispatch('getSettings')
            if (state.timeLogs.timeLogNow !== null) {
                if (confirm('You had one time logging running. It is on pause now. Do you want to resume it?')) {
                    commit('timeLogs/startTimer')
                }
            }
        }
    },
    getters: {
        activeMessages: (s) => s.activeMessages,
        settings: (s) => s.settings,
    }
    ,
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
