import jobApi from '../../api/jobs'
import Job from "@/classes/Job";
import Messages from "@/store/Messages";
import _ from 'lodash'
import moment from "moment"

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

        getJobs({commit}) {
            commit('setLoading', true, {root: true})
            return jobApi.getJobs().then(jobs => {
                commit('setJobs', jobs);
                commit('setLoading', false, {root: true})
                return Promise.resolve(jobs)
            })
        },

        updateJob({commit}, job) {
            commit('setLoading', true, {root: true})
            return jobApi.putJob(new Job(job)).then(job => {
                commit('setLoading', false, {root: true})
                commit('pushMessage', Messages.UPDATED, {root: true})
                return Promise.resolve(new Job(job))
            })
        },

        addJob({commit}, job) {
            commit('setLoading', true, {root: true})
            return jobApi.addJob(new Job(job)).then(resp => {
                commit('setLoading', false, {root: true})
                commit('pushMessage', Messages.JOB_ADDED, {root: true})
            })
        },
        getJob({commit}, id) {
            commit('setLoading', true, {root: true})
           return jobApi.getJob(id).then(job => {
                    commit('setLoading', false, {root: true})
                    return Promise.resolve(new Job(job))
                }
            )
        }
    },
    mutations: {
        setJobs(state, jobs) {
            state.jobs = jobs.map(j => new Job(j))
        },

        setPastJobs(state, jobs) {
            state.pastJobs = [];
            jobs.forEach(j => {
                let job = new Job(j);
                state.pastJobs.push(job);
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
        pastJobs: (s) => s.jobs.filter(j => j.status === Job.status.FINISHED || j.status === Job.status.CANCELLED),
        ongoingJobs: (s) => s.jobs.filter(j => j.status === Job.status.ONGOING),
        idleJobs: (s) => s.jobs.filter(j => j.status === Job.status.IDLE),
        scheduledJobs: (s) => s.jobs.filter(j => j.status === Job.status.SCHEDULED),
    },
});
