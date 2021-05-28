import moment from 'moment'
import TimeLog from "@/classes/TimeLog"
import Vue from 'vue'

export default ({
    namespaced: true,
    state: {
        timeLogs: [],
        timeLogNow: null,
        timer: null,
        showTimeLog: false,
    },
    actions: {
        startTimeLog({commit}, {jobId, stageName}) {
            commit('stopTimeLogNow')
            commit('startTimeLogNow', {jobId, stageName})
            commit('startTimer')
        },
        stopTimeLog({commit}) {
            commit('stopTimeLogNow')
            commit('saveTimeLogToLocal')
            commit('clearTimer')
        },
        clearTimeLog({commit}) {
            commit('clearTimeLog')
            commit('saveTimeLogToLocal')
        },
        removeFromTimeLogs({commit}, index) {
            commit('removeTimeLog', index)
            commit('saveTimeLogToLocal')

        },
        updateInTimeLogs({commit}, {index, timelog}) {
            commit('updateTimeLog', {index,timelog})
            commit('saveTimeLogToLocal')
        }
    },
    mutations: {
        toggleShowTimeLog(state) {
            state.showTimeLog = !state.showTimeLog
        },
        saveTimeLogNowToLocal(state) {
            localStorage.setItem('timeLogNow', JSON.stringify(state.timeLogNow))
        },
        saveTimeLogToLocal(state) {
            localStorage.setItem('timeLogs', JSON.stringify(state.timeLogs))
        },
        loadFromLocal(state) {
            let timeLogs = localStorage.getItem('timeLogs')
            let timeLogNow = localStorage.getItem('timeLogNow')
            try {
                state.timeLogs = JSON.parse(timeLogs)

            } catch (e) {
                state.timeLogs = []
            }
            try {
                state.timeLogNow = new TimeLog(JSON.parse(timeLogNow))

            } catch (e) {
                state.timeLogNow = null
            }

        },
        removeTimeLog(state, index) {
            state.timeLogs.splice(index, 1)
        },

        updateTimeLog(state, {index, timeLog}) {
            Vue.set(state.timeLogs, index, timeLog)
        },

        clearTimeLogs(state) {
            state.timeLogs = []
        },
        clearTimer(state) {
            clearInterval(state.timer)
            state.timer = null;
        },
        startTimer(state) {
            state.timer = setInterval(() => {
                if (state.timeLogNow !== null) {
                    state.timeLogNow.addMinute()
                    localStorage.setItem('timeLogNow', JSON.stringify(state.timeLogNow))
                }
            }, 60000)
        },
        startTimeLogNow(state, {jobId, stageName}) {
            state.timeLogNow = new TimeLog({
                jobId:
                jobId, stageName:
                stageName, duration: 0,
                endedAt: null,
                startedAt: moment().toISOString()
            })

        },
        stopTimeLogNow(state) {
            if(state.timeLogs === null ) state.timeLogs = []
            if (state.timeLogNow !== null) {
                state.timeLogNow.endedAt = moment().toISOString()
                state.timeLogs.unshift(state.timeLogNow)
                state.timeLogNow = null
            }

        }

    },
    getters: {
        timeLogs: s => s.timeLogs,
        timeLogNow: s => s.timeLogNow,
        timer: s => s.timer,
        showTimeLog: s => s.showTimeLog
    },
});
