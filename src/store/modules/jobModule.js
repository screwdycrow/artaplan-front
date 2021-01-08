import jobApi from '../../api/jobs'
import Job from "@/classes/Job";
import Messages from "@/store/Messages";

function findJob(id) {
    return (s) => s.jobId === id;
}

export default ({
    namespaced: true,
    state: {
        showJobEditor: false,
        pastJobs: [],
        jobs: [],
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
        getJobs({commit}) {
            commit('setLoading', true, {root: true})
            return jobApi.getJobs().then(jobs => {
                commit('setJobs', jobs);
                commit('setLoading', false, {root: true})
                return Promise.resolve(jobs)
            })
        },

        addJob({commit}, job) {
            commit('setLoading', true, {root: true})
            return jobApi.addJob(new Job(job)).then(resp => {
                commit('setLoading', false, {root: false})
                commit('pushMessage', Messages.JOB_ADDED, {root: true})
            })
        },
        getJob({commit}, id) {
            commit('setLoading', true, {root: true})
            jobApi.getJob(id).then(job => {
                    commit('setLoading', false, {root: false})
                    commit('setJob', job)
                }
            )
        }
    },
    mutations: {
        setJobs(state, jobs) {
            state.jobs = jobs;
        },
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
        defaultJob: (s) => new Job(s.defaultJob),
        pastJobs: (s) => s.jobs,
        ongoingJobs: (s) => s.jobs,
        idleJobs:(s)=> s.jobs,
        showJobEditor: (s) => s.showJobEditor,
        getJobById: (s) => (id) => s.ongoingJobMap[id]
    },
});
