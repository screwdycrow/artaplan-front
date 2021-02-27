import JobStage from "@/classes/JobStage";
import store from '../store';

export default class {
    constructor(scheduleEntry) {
        this.tempId = Math.floor(Math.random() * 1000000000)
        this.scheduleEntriesId = scheduleEntry.scheduleEntriesId;
        this.jobStageId = scheduleEntry.jobStageId;
        this.jobStage = {};
        this.userId = scheduleEntry.userId;
        this.dateFrom = scheduleEntry.dateFrom;
        this.dateTo = scheduleEntry.dateTo;
        this.jobStage = new JobStage(scheduleEntry.jobStage)
    }

}
