import scheduleApi from "@/api/schedule";
import ScheduleEntry from "@/classes/ScheduleEntry";
import moment from 'moment'

export default ({
    namespaced: true,
    state: {
        schedule:[],
        plannerOptions:{},
        dates:{},
        datesExceptions:[],
    },
    actions: {
        getPlannerOptions({commit},options){
        },

        getSchedule({commit}) {
          return  scheduleApi.getSchedule().then(scheduleItems => commit('setScheduleEntries', scheduleItems))
        },
        updateScheduleItem({commit},scheduleItem){

        },
        getDateExceptions({commit},from){

        },
        getWorkHoursOnDate(date){
        }
    },
    mutations: {
        setPlannerOptions({commit},options){

        },
        setDatesExceptions({commit},exceptions){
        },
        addStageHoursToDate(state,{jobStage,hours,scheduledAt}){
        },

        setScheduleEntries(state, schedule) {
            state.schedule = schedule.map(s=>new ScheduleEntry(s))
        },

    },
    getters: {
        schedule:s=>s.schedule,
        scheduleToday:s=>s.schedule.filter(sch => moment(sch.scheduledAt).isSame(moment(new Date()),'day')),
        plannerOptions:s=>s.plannerOptions,
        datesExceptions:s=>s.datesExceptions,
    },
});
