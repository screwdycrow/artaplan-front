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
            return jobApi.putJob(new Job(job)).then(resp => {
                commit('setLoading', false, {root: true})
                commit('pushMessage', Messages.UPDATED, {root: true})
                let job = new Job(resp);
                commit('updateJobInList', job)
                return Promise.resolve(job)
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
            return jobApi.getJob(id).then(j => {
                    let job = new Job(j)
                    commit('setLoading', false, {root: true})
                    commit('setActiveJob', job)
                    return Promise.resolve(job)
                }
            )
        }
    },
    mutations: {
        updateJobStageWorkHours(state, {workHours, jobId, jobStageId}) {
            let index = state.jobs.findIndex(j => j.jobId === jobId)
            let index2 = state.jobs[index].jobStages.findIndex(j => j.jobStageId === jobStageId)
            let currWorkHours = state.jobs[index].jobStages[index2].workHours;
            Vue.set(state.jobs[index].jobStages[index2],currWorkHours+=workHours)
        },
        setJobs(state, jobs) {
            state.jobs = jobs.map(j => new Job(j))
        },

        setActiveJob(state, job) {
            state.job = job
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

        job: (s) => s.job,
        pastJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.FINISHED || j.status === Job.STATUS.CANCELLED),
        ongoingJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.ONGOING),
        idleJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.IDLE),
        scheduledJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.SCHEDULED),
    },
});
