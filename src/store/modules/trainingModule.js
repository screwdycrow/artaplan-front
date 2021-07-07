import TrainingSession from "@/classes/TrainingSession";

export default ({
    namespaced: true,
    state: {
        showTraining: false,
        trainingSession: null,
        timer: null,
        timeout: null,
        activeImgIndex: 0,
        transitionPause: false,
        duration: 0,
        nextChange: 0,
    },
    actions: {
        startTraining({commit}) {
            commit('startTimer')
        },
        resetTraining({commit}) {
            commit('reset')
        },
        pauseTraining({commit}) {
            commit('clearTimer')
        },
        stopTraining({commit}) {
            commit('clearTimer')
            commit('reset')
            commit('setTrainingSession', null)
            commit('toggleShowTraining')
        }
    },
    mutations: {

        toggleShowTraining(state) {
            state.showTraining = !state.showTraining;
        },
        nextPrevImage(state, step) {
            state.activeImgIndex += step
        },
        clearTimer(state) {
            state.timer = null;
            state.timeout = null;
        },
        reset(state) {
            state.duration = 0;
            state.activeImgIndex = 0;
        },
        startTimer(state) {
            state.showTraining = true
            state.timer = setInterval(() => {
                if (state.duration === state.nextChange + state.trainingSession.images[state.activeImgIndex].time) {
                    state.transitionPause = true
                }
                if (state.duration === state.nextChange + state.trainingSession.images[state.activeImgIndex].totalTime()) {
                    state.transitionPause = false
                    if (state.activeImgIndex < state.trainingSession.images.length) {
                        state.activeImgIndex++
                        state.nextChange = state.duration + state.trainingSession.images[state.activeImgIndex].totalTime()
                    } else {
                        state.timer = null
                        state.timeout = null
                    }
                }
                state.duration++;
            }, 1000)
        },

        setTrainingSession(state, trainingSession) {
            state.trainingSession = new TrainingSession(trainingSession);
        },


    },
    getters: {
        activeImage: s => s.trainingSession.images[s.activeImgIndex],
    },
})
