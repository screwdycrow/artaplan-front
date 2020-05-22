export  default class  {
    constructor(options, jobs,stageDeadlines) {
        this.jobs = jobs;
        this.stageDeadlines = stageDeadlines;
        this.modifiers={
            priorityFirst:1,
            fastFirst:1,
            parallelise:1,
            workload:1,
            deadlines:1
        }

    }
    calculatePriorityFirstFitness(){

    }

    calculateFastFirstFitness(){

    }
    calculateParallelisationFitness(){

    }
    calculateDeadlinesFitness(){

    }
    calculateWorkloadFitness(){
    }

}



