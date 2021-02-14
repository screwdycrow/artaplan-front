import JobStage from "@/classes/JobStage";
import store from '../store';

export default class {
    constructor(scheduleEntry) {
        this.tempId = Math.floor(Math.random() * 1000000000)
        this.scheduleEntryId = scheduleEntry.scheduleEntryId;
        this.jobStageId = scheduleEntry.jobStageId;
        this.jobId = scheduleEntry.jobId;
        this.jobStage = {};
        this.dateFrom = scheduleEntry.dateFrom;
        this.dateTo = scheduleEntry.dateAt;
    }

}
