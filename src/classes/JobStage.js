import Stage from "@/classes/Stage";
import Job from "@/classes/Job";

export default class  {
    constructor(jobStage) {
        this.jobStageId = jobStage.jobStageId;
        this.jobId = jobStage.jobId;
        this.stageId = jobStage.stageId;
        this.job = {};
        this.stage = {};
        if(jobStage.stage)this.setStage(jobStage.stage);
        this.workHours = jobStage.workHours;
        this.jobHours = jobStage.jobHours;
        this.order = jobStage.order;
    }
    setStage(stage){
        this.stage = new Stage(stage);
    }
    getCompletionPercentage(){
        return ((this.workHours /  this.jobHours)*100).toFixed(0);
    }

}
