import jobApi from '../../api/jobs'
import Job from "@/classes/Job";

function findJob(id) {
    return (s) => s.jobId === id;
}

export default ({
    namespaced: true,
    state: {
        showJobEditor: false,
        pastJobs: [],
        ongoingJobs: [],
        ongoingJobMap: {},
        job: {},
    },
    actions: {
        getOngoingJobs({commit}) {
            return jobApi.getJobs("ongoing").then(jobs => {
                commit("setOngoingJobs", jobs);
                return Promise.resolve(jobs)
            })
        },
        getPastJobs({commit}){
          commit("setPastJobs",jobs)
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
        setPastJobs(state, jobs) {
            state.pastJobs = [];
            jobs.forEach(j => {
                let job = new Job(j);
                state.pastJobs.push(job);
            })
        },
        setOngoingJobs(state, jobs) {
            state.ongoingJobs = [];
            state.ongoingJobMap = {};
            jobs.forEach(j => {
                let job = new Job(j);
                state.ongoingJobs.push(job);
                state.ongoingJobMap[job.jobId] = job;
            })
        },
        pushJobToList(state, job) {
            if (job.status !== Job.status.ONGOING) {
                state.pastJobs.push(job)
            } else {
                state.ongoingJobs.push(job)
            }
        },

        updateJobInList({state}, job) {
            const index = state.pastJobs.findIndex(findJob(job.jobId));
            if (index !== -1) Vue.set(state.jobs, index, job)
        },
        removeJobFromList({state}, job) {
            if (job.status !== Job.status.ONGOING) {
                const index = state.pastJobs.findIndex(findJob(job.jobId));
                if (index !== -1) {
                    state.pastJobs.splice(index, 1)
                }
            } else {
                const index = state.ongoingJobs.findIndex(findJob(job.jobId));
                if (index !== -1) {
                    state.ongoingJobs.splice(index, 1)
                }
            }

        }

    },
    getters: {
        defaultJob:(s) => new Job(s.defaultJob),
        pastJobs: (s) => s.pastJobs,
        ongoingJobs: (s) => s.ongoingJobs,
        showJobEditor: (s) => s.showJobEditor,
        getJobById: (s) => (id) => s.ongoingJobMap[id]
    },
});
