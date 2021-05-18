import Vue from 'vue'
import Vuex from 'vuex'
import slotModule from "@/store/modules/slotModule";
import jobModule from "@/store/modules/jobModule";
import stageModule from "./modules/stageModule"
import scheduleModule from "@/store/modules/scheduleModule";
import customerModule from "@/store/modules/customerModule";
import userModule from "@/store/modules/userModule";
import moment from 'moment'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isMobile: false,
        isLoading:false,
        activeMessages: [],

    },
    mutations: {
        setLoading(state,value){
            state.isLoading = value
        },
        pushMessage(state, {type, text}) {
            state.activeMessages.push({
                date: moment().format('DD/MM hh:mm:ss'),
                active:true,
                type: type,
                text:text,
            });
        },
        removeMessage(state, message) {
            const index = state.activeMessages.findIndex( m => m.date === message.date);
            state.activeMessages.splice(index, 1)
        },
    },
    actions: {},
    getters:{
        activeMessages:(s)=> s.activeMessages
    },
    modules: {
        schedule: scheduleModule,
        slots: slotModule,
        jobs: jobModule,
        stages: stageModule,
        customers: customerModule,
        users: userModule
    }
})
