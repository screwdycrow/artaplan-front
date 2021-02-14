import scheduleApi from "@/api/schedule";
import ScheduleEntry from "@/classes/ScheduleEntry";
import moment from 'moment'
import Mappers from "../../classes/Mappers"
import _ from 'lodash'

export default ({
    namespaced: true,
    state: {
        schedule: [],
        plannerOptions: {},
        daysEntries: {},
        days: [],
        datesExceptions: [],
        workload: []
    },
    actions: {

        getSchedule({commit}) {
            commit('setLoading', true, {root: true})
            return scheduleApi.getSchedule()
                .then(scheduleItems => {
                    scheduleItems.forEach((s, index) => {
                        let entry = new ScheduleEntry(s)
                        scheduleItems[index] = entry
                        commit('addEntryToDay', {entry: entry, date: entry.scheduledAt})
                    })
                    commit('setSchedule', schedule)
                    commit('setLoading', false, {root: true})
                })
        },
        updateScheduleEntry({commit}, entry) {
            return scheduleApi.putScheduleEntry(entry).then(s => {
                let entry = new ScheduleEntry(s)
                commit('updateScheduleEntry', entry)
                commit('updateEntryOnDay', {entry: entry, date: entry.scheduledAt})
            })
        },
        changeDateEntry(state, {entry, date}) {
            commit('removeEntryFromDay', {entry, date})
            let newEntry = _.cloneDeep(entry);
            newEntry.dateFrom = moment(date).toISOString()
            newEntry.dateTo = moment(date).toISOString()
            return scheduleApi.putScheduleEntry(newEntry).then(s=>{
                let entry = new ScheduleEntry(s);
                commit('updateScheduleEntry', entry)
                commit('addEntryToDay', {entry: entry, date: entry.dateFrom})
            })
        },
        addScheduleEntry({commit}, {jobStage, date}) {
            let entry = Mappers.ScheduleEntryFromJobStage(jobStage);
            entry.dateFrom = moment(date).toISOString();
            entry.dateTo = moment(date).toISOString();

            return scheduleApi.postScheduleEntry(entry).then((s) => {
                let entry = new ScheduleEntry(s)
                commit('addToSchedule', new ScheduleEntry(entry))
                commit('addEntryToDay', {entry: entry, date: entry.dateFrom})
            })
        },
        deleteScheduleEntry({commit}, entry) {
            return scheduleApi.deleteScheduleEntry(entry).then(() => {
                commit('removeFromSchedule', entry)
                commit('removeEntryFromDay', {entry: entry, date: entry.dateFrom})
            })
        },

        getWorkload({commit}) {
            return scheduleApi.getWorkload().then(
                workload => commit('setWorkload', workload)
            )
        },
    },
    mutations: {

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


        updateScheduleEntry(state, entry) {
            const index = state.schedule.findIndex(entry.scheduleEntryId)
            if (index !== -1) {
                state.schedule[index] = entry
            }
        },
        addToSchedule(state, entry) {
            state.schedule.push(entry)
        },
        removeFromSchedule(state, entry) {
            const index = state.schedule.findIndex(entry.scheduleEntryId)
            if (index !== -1) {
                state.schedule.splice(index);
            }
        },
        removeEntryFromDay(state, {entry, date}) {
            let dateIndex = moment(date).toISOString()
            const index = state.daysEntries[dateIndex].findIndex(e => e.tempId === entry.scheduleEntryId)
            if (index !== -1) {
                state.state.daysEntries[dateIndex].splice(index)
            }
        },
        updateEntryOnDay(state, {entry, date}) {
            let dateIndex = moment(date).toISOString()
            const index = state.daysEntries[dateIndex].findIndex(e => e.tempId === entry.scheduleEntryId)

            if (index !== -1) {
                state.state.daysEntries[dateIndex] = entry
            }
        },
        addEntryToDay(state, {entry, date}) {
            if (state.daysEntries[date] !== undefined) state.daysEntries[date] = [];
            state.daysEntries[date].push(entry);
        },

        setSchedule(state, schedule) {
            state.schedule = schedule;
        },
    },
    getters: {
        days: s => s.days,
        schedule: s => s.schedule,
        scheduleToday: s => s.schedule.filter(sch => moment(sch.scheduledAt).isSame(moment(Date.now()), 'day')),
        plannerOptions: s => s.plannerOptions,
        datesExceptions: s => s.datesExceptions,
        entriesOfDay: s => (date) => s.daysEntries[moment(date).toISOString()]
    },
});
