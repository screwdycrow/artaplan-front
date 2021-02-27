import Stage from "@/classes/Stage";
import Job from "@/classes/Job";

export default class  {
    constructor(jobStage) {
        this.jobStageId = jobStage.jobStageId;
        this.jobId = jobStage.jobId;
        this.stageId = jobStage.stageId;
        this.job = {};
        this.setJob(jobStage.job)
        this.stage = {};
        this.setStage(jobStage.stage);
        this.workHours = jobStage.workHours;
        this.jobHours = jobStage.jobHours;
        this.order = jobStage.order;
    }
    setJob(job){
        if(job){
            this.job = new Job(job);
        }
    }
    setStage(stage){
        if(stage){
            this.stage = new Stage(stage);
        }
    }
    getCompletionPercentage(){
        return ((this.workHours /  this.jobHours)*100).toFixed(0);
    }
    fillJobStageFromStage(stage){
        this.stageId = stage.stageId;
        this.stage = stage;
        this.workHours = 0;
        this.jobHours = stage.estimatedHours;
        this.order = stage.order;
    }

}
