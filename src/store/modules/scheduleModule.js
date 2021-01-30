import scheduleApi from "@/api/schedule";
import ScheduleEntry from "@/classes/ScheduleEntry";
import moment from 'moment'

export default ({
    namespaced: true,
    state: {
        schedule: [],
        plannerOptions: {},
        dates: {},
        days: [],
        datesExceptions: [],
        workload: []
    },
    actions: {
        getPlannerOptions({commit}, options) {
        },

        getSchedule({commit}) {
            return scheduleApi.getSchedule().then(scheduleItems => commit('makeSchedule', scheduleItems))
        },
        updateScheduleItem({commit}, scheduleItem) {

        },
        addScheduleEntry() {

        },
        getDateExceptions({commit}, from) {

        },
        getWorkload({commit}) {
            return scheduleApi.getWorkload().then(
                workload => commit('setWorkload', workload)
            )
        },
        getWorkHoursOnDate(date) {
        }
    },
    mutations: {

        putScheduleEntry(scheduleEntry) {

        },
        /**
         *
         * @param state
         * @param date
         * @param minus
         * @param plus
         */
        setDays(state, {date, minus, plus}) {
            let today = moment(date).toISOString();
            let i = 0;
            let j = 0;
            let daysBefore = [];
            let daysAfter = [];
            while (i > minus) {
                i--;
                daysBefore.push(moment(date).add(i, 'days').toISOString());
            }
            while (j < plus) {
                j++
                daysAfter.push(moment(date).add(j, 'days').toISOString());
            }
            state.days = [].concat(daysBefore, today, daysAfter)
        },

        setWorkload(state, workload) {
            state.workload = workload;
        },

        makeSchedule(state, schedule) {
            state.schedule = schedule.map(s => new ScheduleEntry(s))
        },
    },
    getters: {
        days:s=>s.days,
        schedule: s => s.schedule,
        scheduleToday: s => s.schedule.filter(sch => moment(sch.scheduledAt).isSame(moment(Date.now()), 'day')),
        plannerOptions: s => s.plannerOptions,
        datesExceptions: s => s.datesExceptions,
    },
});
