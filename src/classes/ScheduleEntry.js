import JobStage from "@/classes/JobStage";
import store from '../store';
export default class  {
    constructor(scheduleEntry) {
        this.scheduleEntryId = scheduleEntry.scheduleEntryId;
        this.jobStageId = scheduleEntry.jobStageId;
        this.jobId = scheduleEntry.jobId;
        this.jobStage = {};
        this.setJob(scheduleEntry.jobId);
        this.scheduledAt = scheduleEntry.scheduledAt;
        this.isDeadline = scheduleEntry.isDeadline;
        this.done = scheduleEntry.done;
        this.hours = scheduleEntry.hours;
    }
    getJobStage(){
        return  this.getJob().jobStages.find(js=>js.jobStageId === this.jobStageId)
    }
    getJob(){
        return store.getters['jobs/getJobById'](this.jobId);
    }
    setJob(){
        this.job =  store.getters['jobs/getJobById'](this.jobId);
        this.jobStage = this.job.jobStages.find(js=>js.jobStageId === this.jobStageId)
    };
}
