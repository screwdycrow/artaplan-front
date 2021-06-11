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
    getFormattedDuration(){
        if(this.duration<60){
            return this.duration+'m'
        }else{
            return Math.floor(this.duration/60)+'h '+(this.duration % 60)
        }
    }
}
