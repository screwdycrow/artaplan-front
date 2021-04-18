import axios from '../api/axios'
import JobStage from '../classes/JobStage'

export default {
    putJobStage(jobStage){
        return axios.put('/JobStage/5')
    }
}