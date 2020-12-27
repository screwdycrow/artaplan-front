import axios from '../api/axios'
import Job from "../classes/Job"


export default {
    addJob(job) {
        let _job = null;
        if (job instanceof Job) {
            _job = job
        } else {
            _job = new Job(job)
        }
        return axios.post('/Jobs', job).then(resp => Promise.resolve(resp.data))
    },
    getJobs(type) {
        return Promise.resolve([]);
    },
    getJob() {
        return Promise.resolve([]);
    }
}
