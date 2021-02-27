import axios from '../api/axios'

export default {
    getSchedule() {
        return axios.get('/ScheduleEntries')
            .then(resp => resp.data)
    },
    postScheduleEntry(entry) {
        return axios.post('/ScheduleEntries', entry).then(
            resp => resp.data
        )
    },
    putScheduleEntry(entry) {
        return axios.put('/ScheduleEntries/' + entry.scheduleEntriesId, entry)
            .then(
                resp => resp.data
            )
    },
    deleteScheduleEntry(entry) {
        return axios.delete('/ScheduleEntries/' + entry.scheduleEntriesId)
            .then(resp => resp.data)
    },

    getWorkload() {
        return Promise.resolve(workload)
    }
}
