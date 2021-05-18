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
            }).catch(resp => {
                commit('setLoading', false, {root: true})
                commit('pushMessage', {text: Messages.ERROR, type: 'successs'}, {root: true})
            })
        },

        updateJob({commit}, job) {
            commit('setLoading', true, {root: true})
            let _job = _.cloneDeep(job)
            _job.references = JSON.stringify(_job.references);
            return jobApi.putJob(_job)
                .then(resp => {
                    commit('setLoading', false, {root: true})
                    commit('pushMessage', {text: Messages.UPDATED, type: 'success'}, {root: true})
                    let job = new Job(resp);
                    commit('updateJobInList', job)
                    return Promise.resolve(job)
                })
        },

        addJob({commit}, job) {
            commit('setLoading', true, {root: true})
            let _job = _.cloneDeep(job)
            _job.references = JSON.stringify(_job.references);
            return jobApi.addJob(_job).then(resp => {
                commit('setLoading', false, {root: true})
                commit('pushJobToList', job)
                commit('pushMessage', {text: Messages.JOB_ADDED, type: 'success'}, {root: true})
            })
        },
        deleteJob({commit}, job) {
            commit('setLoading', true, {root: true})
            return jobApi.deleteJob(job)
                .then(resp => {
                    commit('setLoading', false, {root: true})
                    commit('pushMessage', {text: 'deleted', type: 'success'}, {root: true})
                    commit('removeJobFromList', job)
                    return Promise.resolve(true)
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
            Vue.set(state.jobs[index].jobStages[index2], currWorkHours += workHours)
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
            state.jobs.push(job)
        },

        updateJobInList(state, job) {
            const index = state.jobs.findIndex(findJob(job.jobId));
            if (index !== -1) Vue.set(state.jobs, index, job)
        },
        removeJobFromList(state, job) {
            const index = state.jobs.findIndex
            (findJob(job.jobId));
            if (index !== -1) {
                state.jobs.splice(index, 1)
            }

        }

    },
    getters: {
        deadlinesOfDay: (s, getters) => (date) => getters.ongoingJobs.filter((j) => {
                return moment(j.deadline).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
            }
        ),
        job: (s) => s.job,
        pastJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.FINISHED || j.status === Job.STATUS.CANCELLED),
        ongoingJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.ONGOING).sort((j1, j2) => moment(j1.deadline).format('YYYYMMDD') - moment(j2.deadline).format('YYYYMMDD')),
        idleJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.IDLE),
        scheduledJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.SCHEDULED),
        jobsOfSlot: (s) => (slotId) => s.jobs.filter(j => j.slotId === slotId),
    },
});
