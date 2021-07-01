import scheduleApi from "@/api/schedule";
import ScheduleEntry from "@/classes/ScheduleEntry";
import moment from 'moment'
import Mappers from "../../classes/Mappers"
import _ from 'lodash'
import Vue from 'vue'

export default ({
    namespaced: true,
    state: {
        schedule: [],
        plannerOptions: {},
        daysEntries: {},
        days: [],
        datesExceptions: [],
        workload: [],
        stats: {}
    },
    actions: {

        getSchedule({commit, state}, reloadData) {
            commit('setLoading', true, {root: true})
            if (reloadData || state.schedule.length === 0) {
                return scheduleApi.getSchedule()
                    .then(scheduleItems => {
                        scheduleItems.forEach((s, index) => {
                            let entry = new ScheduleEntry(s)
                            scheduleItems[index] = entry
                            commit('addEntryToDay', {entry: entry, date: entry.dateFrom})
                        })
                        commit('setStats',{days1:60, days2:30})
                        commit('setSchedule', scheduleItems)
                        commit('setLoading', false, {root: true})
                    })
            } else {
                commit('setLoading', false, {root: true})
                return Promise.resolve()
            }
        },
        doScheduleEntry({commit}, entry) {
            commit('setLoading', true, {root: true})
            return scheduleApi.doScheduleEntry(entry).then(s => {
                let entry = new ScheduleEntry(s)
                commit('updateScheduleEntry', entry)
                commit('updateEntryOnDay', {entry: entry, date: entry.dateFrom})
                commit('setLoading', false, {root: true})
                return Promise.resolve(entry);
            }).catch(() => {
                commit('setLoading', false, {root: true})
            })
        },
        updateScheduleEntry({commit}, entry) {
            commit('setLoading', true, {root: true})
            return scheduleApi.putScheduleEntry(entry).then(s => {
                let entry = new ScheduleEntry(s)
                commit('updateScheduleEntry', entry)
                commit('updateEntryOnDay', {entry: entry, date: entry.dateFrom})
                commit('setLoading', false, {root: true})
                return Promise.resolve(entry);
            }).catch(() => {
                commit('setLoading', false, {root: true})
            })
        },

        changeDateEntry({commit}, {entry, date}) {
            commit('setLoading', true, {root: true})
            commit('removeEntryFromDay', entry)
            let newEntry = _.cloneDeep(entry);
            newEntry.dateFrom = moment(date).format("YYYY-MM-DD")
            newEntry.dateTo = moment(date).format("YYYY-MM-DD")
            return scheduleApi.putScheduleEntry(newEntry).then(s => {
                let entry = new ScheduleEntry(s);
                commit('updateScheduleEntry', entry)
                commit('addEntryToDay', {entry: entry, date: entry.dateFrom})
                commit('setLoading', false, {root: true})
                return Promise.resolve(entry);
            }).catch(() => {
                commit('setLoading', false, {root: true})
            })
        },
        addScheduleEntry({commit}, {jobStage, date}) {
            let entry = Mappers.ScheduleEntryFromJobStage(jobStage);
            entry.dateFrom = moment(date).format("YYYY-MM-DD");
            entry.dateTo = moment(date).format("YYYY-MM-DD");

            return scheduleApi.postScheduleEntry(entry).then((s) => {
                let entry = new ScheduleEntry(s)
                commit('addToSchedule', new ScheduleEntry(entry))
                commit('addEntryToDay', {entry: entry, date: entry.dateFrom})
                return Promise.resolve(entry);
            })
        },
        deleteScheduleEntry({commit}, entry) {
            return scheduleApi.deleteScheduleEntry(entry).then(() => {
                commit('removeEntryFromDay', entry)
                commit('removeFromSchedule', entry)
                return Promise.resolve(true)
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
            let today = moment(date).startOf('day').format("YYYY-MM-DD");
            let i = 0;
            let j = 0;
            let daysBefore = [];
            let daysAfter = [];
            while (i > minus) {
                i--;
                let formatted = moment(today).add(i, 'days').format("YYYY-MM-DD")
                daysBefore.push(formatted);
                if (state.daysEntries[formatted] === undefined) state.daysEntries[formatted] = []
            }
            while (j < plus) {
                let formatted = moment(today).add(j, 'days').format("YYYY-MM-DD")
                daysAfter.push(formatted);
                if (state.daysEntries[formatted] === undefined) state.daysEntries[formatted] = []
                j++
            }
            state.days = [].concat(daysBefore, daysAfter)
        },

        setWorkload(state, workload) {
            state.workload = workload;
        },


        setStats(s,{days1, days2}) {
            let days = {}
            for (const date in s.daysEntries) {
                if (s.daysEntries.hasOwnProperty(date)) {
                    if (moment().isAfter(date)) {

                        let dateObj = moment(date);
                        let day = dateObj.day();
                        let dayName = dateObj.format('ddd')
                        if (moment().subtract(days2, 'days').isBefore(date)) {
                            if (days[day] === undefined) {
                                days[day] = {
                                    name:dayName,
                                    workHours: 0,
                                    dayCount: 0,
                                    workHoursMonth: 0,
                                    dayCountMonth: 0
                                }
                            }
                            days[day].workHoursMonth += s.daysEntries[date].length
                            days[day].dayCountMonth++
                        } else if (moment().subtract(days1, 'days').isBefore(date)) {
                            if (days[day] === undefined) {
                                days[day] = {
                                    name:dayName,
                                    workHours: 0,
                                    dayCount: 0,
                                    workHoursMonth: 0,
                                    dayCountMonth: 0
                                }
                            }
                            days[day].workHours += s.daysEntries[date].length
                            days[day].dayCount++
                        }
                    }
                }
            }
            s.stats = days;
        },
        updateScheduleEntry(state, entry) {
            const index = state.schedule.findIndex(e => e.scheduleEntriesId === entry.scheduleEntriesId)
            if (index !== -1) {
                state.schedule[index] = entry
            }
        },
        addToSchedule(state, entry) {
            state.schedule.push(entry)
        },
        removeFromSchedule(state, entry) {
            const index = state.schedule.findIndex(e => e.scheduleEntriesId === entry.scheduleEntriesId)
            if (index !== -1) {
                state.schedule.splice(index);
            }
        },
        removeEntryFromDay(state, entry) {
            let dateIndex = moment(entry.dateFrom).format("YYYY-MM-DD")
            console.log(entry)
            const index = state.daysEntries[dateIndex].findIndex(e => e.scheduleEntriesId === entry.scheduleEntriesId)
            console.log(state.daysEntries[dateIndex]);
            console.log(dateIndex);
            console.log(index);
            if (index !== -1) {
                state.daysEntries[dateIndex].splice(index, 1)
            }
        },
        updateEntryOnDay(state, {entry, date}) {
            let dateIndex = moment(date).format("YYYY-MM-DD")
            const index = state.daysEntries[dateIndex].findIndex(e => e.scheduleEntriesId === entry.scheduleEntriesId)

            if (index !== -1) {
                state.state.daysEntries[dateIndex] = entry
            }
        },
        addEntryToDay(state, {entry, date}) {
            let formatted = moment(date).format("YYYY-MM-DD")
            if (state.daysEntries[formatted] === undefined) Vue.set(state.daysEntries, formatted, [])
            state.daysEntries[formatted].push(entry);
        },
        setSchedule(state, schedule) {
            state.schedule = schedule;
        },
    },
    getters: {
        workload: s => [],
        days: s => s.days,
        dayStats: s => s.stats,
        schedule: s => s.schedule,
        plannerOptions: s => s.plannerOptions,
        datesExceptions: s => s.datesExceptions,
        entriesOfDay: s => day => s.daysEntries[day]
    },
});

