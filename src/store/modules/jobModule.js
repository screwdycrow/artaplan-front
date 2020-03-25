import jobApi from '../../api/jobs'

function findJob(id) {
    return (s) => s.jobId === id;
}
export default ({
    namespaced: true,
    state: {
        showJobEditor: false,
        jobs: [],
        job: {},
        defaultJob: {
        }
    },
    actions: {
        getAllJobs({commit}) {
            jobApi.getJobs().then(jobs => {
                commit("setJobs", jobs)
            })
        },
        getJob({commit}, id) {
            jobApi.getJob(id).then(job => commit('setJob', job))
        }
    },
    mutations: {
        setJob(state, job) {
            state.job = Object.assign({}, job)
        },
        toggleEditor(state) {
            state.showJobEditor = !state.showJobEditor;
        },
        setJobs(state, jobs) {
            state.jobs = jobs
        },
        pushJobToList(state, job) {
            state.jobs.push({}, Object.assign(job))
        },
        updateJobInList({state}, job) {
            const index = state.jobs.findIndex(findJob(job.jobId));
            if (index !== -1) Vue.set(state.jobs, index, job)
        },
        removeJobFromList({state}, job) {
            const index = state.jobs.findIndex(findJob(job.jobId));
            if (index !== -1) {
                state.jobs.splice(index, 1)
            }
        }

    },
    getters: {
        jobs: (s) => s.jobs,
        job: (s) => Object.assign(s.job),
        showJobEditor: (s) => s.showJobEditor,
    },
});
