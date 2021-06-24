import jobApi from '../../api/jobs'
import Job from "@/classes/Job";
import Messages from "@/store/Messages";
import _ from 'lodash'
import moment from "moment"
import Vue from 'vue'
import gdFiles from "@/api/gdFiles";

const gdrive = 'https://www.googleapis.com/upload/drive/v3'

function findJob(id) {
    return (s) => s.jobId === id;
}

export default ({
    namespaced: true,
    state: {
        showJobEditor: false,
        pastJobs: [],
        jobs: [],
        jobFiles: [],
        folderId: null,
        ongoingJobMap: {},
        job: {},
    },
    actions: {

        gdCreateJobFolder({state, dispatch}) {
            return this._vm.$gapi.getGapiClient().then(gapi => {
                return gdFiles.getMainFolder(gapi)
                    .then(folderId => gdFiles.createFolder(gapi, state.job.name, [folderId]))
            })
        },
        gdGetJobFiles({state, dispatch}) {
            return this._vm.$gapi.getGapiClient().then(gapi => {
                return dispatch('gdGetJobFolderId')
                    .then(folderId => gdFiles.listFiles(gapi,
                        {
                            'q': `trashed = false and '${folderId}' in parents`,
                            'fields': 'nextPageToken, files(id, name, webContentLink, size)',
                        })
                    )
            })
        },
        gdGetJobFolderId({state, dispatch, commit}) {
            return this._vm.$gapi.getGapiClient().then(gapi => {
                return gdFiles.getMainFolder(gapi)
                    .then(folderId => gdFiles.listFiles(gapi,
                        {
                            'q': `mimeType = 'application/vnd.google-apps.folder' and trashed = false  and name = '${state.job.name}' and '${folderId}' in parents`,
                            'fields': 'nextPageToken, files(id, name)',
                        })
                    )
                    .then(folders => {
                        if (folders.length === 1) {
                            commit('setFolderId', folders[0].id);
                            return Promise.resolve(folders[0].id);
                        } else if (folders.length === 0) {
                            return dispatch('gdCreateJobFolder')
                        }
                    })


            })
        }
        ,
        gdAddJobFile({dispatch}, file) {
            return this._vm.$gapi.getGapiClient().then(gapi => {
                return dispatch('gdGetJobFolderId').then(folderId => {
                    return gdFiles.addFile(gapi, file, [folderId])
                })
            })

        }
        ,
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
        }
        ,

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
        }
        ,

        addJob({commit}, job) {
            commit('setLoading', true, {root: true})
            let _job = _.cloneDeep(job)
            console.log(_job.references);
            _job.references = JSON.stringify(_job.references);
            return jobApi.addJob(_job).then(resp => {
                commit('setLoading', false, {root: true})
                console.log(resp);
                job.jobId = resp.jobId
                commit('pushJobToList', new Job(job))
                commit('pushMessage', {text: Messages.JOB_ADDED, type: 'success'}, {root: true})
            })
        }
        ,
        deleteJob({commit}, job) {
            commit('setLoading', true, {root: true})
            return jobApi.deleteJob(job)
                .then(resp => {
                    commit('setLoading', false, {root: true})
                    commit('pushMessage', {text: 'deleted', type: 'success'}, {root: true})
                    commit('removeJobFromList', job)
                    return Promise.resolve(true)
                })
        }
        ,
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
        setFolderId(state, folder) {
            state.folderId = folder;
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
        statsOfMonths: (s) => {
            let months = {}
            s.jobs.forEach((job) => {
                if (job.status === Job.STATUS.FINISHED || job.status === Job.STATUS.ONGOING) {
                    let finishedDate = moment(job.startedAt).format('YYYY-MM')
                    if (months[finishedDate] === undefined) {
                        months[finishedDate] = {
                            totalHours: job.getHoursSpent(),
                            totalPrice: job.price
                        }
                    } else {
                        months[finishedDate].totalHours += job.getHoursSpent();
                        months[finishedDate].totalPrice += job.price;
                    }
                }
            })
            return months;

        },
        job: (s) => s.job,
        jobById: (s) => id => s.jobs[s.jobs.findIndex(j => j.jobId === id)],
        pastJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.FINISHED || j.status === Job.STATUS.CANCELLED),
        ongoingJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.ONGOING).sort((j1, j2) => moment(j1.deadline).format('YYYYMMDD') - moment(j2.deadline).format('YYYYMMDD')),
        idleJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.IDLE),
        scheduledJobs: (s) => s.jobs.filter(j => j.status === Job.STATUS.SCHEDULED),
        jobsOfSlot: (s) => (slotId) => s.jobs.filter(j => j.slotId === slotId),
    },
});
