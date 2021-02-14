import ScheduleEntry from "./ScheduleEntry"

export default {
    /**
     *
     * @param jobStage
     * @constructor
     */
    ScheduleEntryFromJobStage(jobStage){
        let entry = {
            scheduleEntryId:null,
            jobStageId: jobStage.jobStageId,
            jobId: jobStage.jobId,
            dateFrom:null,
            dateTo:null,
        }
        return new ScheduleEntry(entry)
    }
}