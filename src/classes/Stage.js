export default class  {
    constructor(stage) {
        this.stageId = stage.stageId;
        this.description = stage.description;
        this.name = stage.name;
        this.userId = stage.userId;
        this.estimatedHours = stage.estimatedHours;
        this.avgHours = stage.avgHours;
        this.order = stage.order;
        this.tags = stage.tags;
    }
}
