import TrainingSession from "@/classes/TrainingSession";

export default ({
    namespaced: true,
    state: {
        showTraining: false,
        trainingSession: null,
        timer: null,
        activeImgIndex: 0,
        finished: false,
        transitionPause: false,
        duration: 0,
        timePassed: 0,
    },
    actions: {

        startTraining({commit}) {
            commit('startTimer')
        },
        resetTraining({commit}) {
            commit('clearTimer')
            commit('reset')
            commit('setActiveImgIndex', 0)
        },
        restartTraining({commit, dispatch}) {
            dispatch('resetTraining')
            dispatch('startTraining')
        },
        pauseTraining({commit}) {
            commit('clearTimer')
        },
        jumpToImage({commit}, index) {
            commit('reset');
            commit('setActiveImgIndex', index)

        },
        skipBreak({commit,}) {
            commit('nextImageIndex')
            commit('setDuration', 0);
        },
        stopTraining({commit}) {
            commit('clearTimer')
            commit('toggleShowTraining')
            commit('reset')
            commit('setTrainingSession', null)
            commit('setActiveImgIndex', 0);
        }
    },
    mutations: {

        toggleShowTraining(state) {
            state.showTraining = !state.showTraining;
        },
        setDuration(state, duration) {
            state.duration = duration;
        },
        nextImageIndex(state) {
            state.transitionPause = false
            state.activeImgIndex ++;
        },
        setActiveImgIndex(state, activeImgIndex) {
            if (activeImgIndex <= state.trainingSession.images.length && activeImgIndex > 0) {
                state.activeImgIndex = activeImgIndex - 1
                state.duration = state.trainingSession.images[state.activeImgIndex].time + 1;
                state.transitionPause = true
            } else if (activeImgIndex <= 0) {
                state.activeImgIndex = 0;
            } else{
            }
        },
        clearTimer(state) {
            clearInterval(state.timer);
            state.timer = null;
        },
        reset(state) {
            state.transitionPause = false
            state.finished = false;
            state.duration = 0;
        },

        startTimer(state) {
            state.showTraining = true
            state.timer = setInterval(() => {
                if (state.duration === state.trainingSession.images[state.activeImgIndex].time) {
                    if (state.activeImgIndex + 1 < state.trainingSession.images.length) {
                        state.transitionPause = true;
                    }else{
                        clearInterval(state.timer);
                        state.timer = null;
                        state.finished = true;
                    }
                }
                if (state.duration === state.trainingSession.images[state.activeImgIndex].totalTime()) {
                    state.transitionPause = false
                    if (state.activeImgIndex + 1 < state.trainingSession.images.length) {
                        state.activeImgIndex++
                        state.duration = 0;
                    } else {
                        clearInterval(state.timer);
                        state.timer = null;
                        state.finished = true;
                    }
                }
                state.duration++;
                state.timePassed++;
            }, 1000)
        },

        setTrainingSession(state, trainingSession) {
            if (trainingSession !== null) {
                state.trainingSession = new TrainingSession(trainingSession);
            } else {
                state.trainingSession = null
            }
        },


    },
    getters: {
        paused: s => s.timer === null,
        hasNext: s => s.activeImgIndex + 1 < s.trainingSession.images.length,
        hasNext2: s => s.activeImgIndex + 2 < s.trainingSession.images.length,
        hasPrev: s => s.activeImgIndex - 1 > 0,
        activeImage: s => s.trainingSession.images[s.activeImgIndex],
        nextImage: s => s.trainingSession.images[s.activeImgIndex + 1],
        remainingTime: s => {
            if (s.duration <= s.trainingSession.images[s.activeImgIndex].time) {
                return s.trainingSession.images[s.activeImgIndex].time - s.duration;
            } else {
                return s.trainingSession.images[s.activeImgIndex].totalTime() - s.duration
            }
        }
    },
})
