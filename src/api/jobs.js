import axios from '../api/axios'
import Job from "../classes/Job"


export default {
    putJob(job) {
        return axios.put('/Jobs/' + job.jobId, job).then(resp => Promise.resolve(resp.data))
    },
    addJob(job) {
        job.references = JSON.stringify(job.references);
        return axios.post('/Jobs', job).then(resp => Promise.resolve(resp.data))
    },
    getJobs() {
        return axios.get('/Jobs').then(resp => resp.data)
    },
    getJob(jobId) {
        return axios.get('/Jobs/' + jobId).then(resp => resp.data)
    },
    deleteJob(jobId) {
        return axios.get('/Jobs/' + jobId).then(resp => resp.data)
    }
}

function makeJob(job) {

    let _job = null;
    if (job instanceof Job) {
        _job = job
    } else {
        _job = new Job(job)
    }
    return _job
}