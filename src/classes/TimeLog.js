export default class {
    constructor(obj) {
        this.startedAt = obj.startedAt || null;
        this.endedAt = obj.endedAt || null;
        this.duration = obj.duration;
        this.jobId = obj.jobId;
        this.stageName = obj.stageName;
    }
    addMinute(){
        this.duration++
    }
    getHours(){
        this.duration/60
    }
}
