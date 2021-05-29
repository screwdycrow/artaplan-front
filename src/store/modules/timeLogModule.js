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
        pause: false,
    },
    actions: {
        startTimeLog({commit}, {jobId, stageName}) {
            commit('clearTimer')
            commit('stopTimeLogNow')
            commit('startTimeLogNow', {jobId, stageName})
            commit('startTimer')
        },
        stopTimeLog({commit, state}) {
            commit('stopTimeLogNow')
            commit('saveTimeLogToLocal')
            commit('clearTimer')
            commit('saveTimeLogNowToLocal')
            if (!state.showTimeLog) {
                commit('toggleShowTimeLog')
            }
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
            commit('updateTimeLog', {index, timelog})
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
            state.pause = true;
        },
        startTimer(state) {
            if (state.timeLogs === null) state.timeLogs = []
            state.pause = false
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
            if (state.timeLogs === null) state.timeLogs = []
            if (state.timeLogNow !== null) {
                state.timeLogNow.endedAt = moment().toISOString()
                state.timeLogs.unshift(state.timeLogNow)
                state.timeLogNow = null
            }

        }

    },
    getters: {
        totalTimeLogDurationPerJob: s => s.timeLogs.reduce((acc, timeLog) => {
            if (acc[timeLog.jobId] === undefined) acc[timeLog.jobId] = 0
            acc[timeLog.jobId] += timeLog.duration
            return acc
        }, {}),
        timeLogs: s => s.timeLogs,
        timeLogNow: s => s.timeLogNow,
        pause: s => s.pause,
        showTimeLog: s => s.showTimeLog
    },
});
