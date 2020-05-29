export default class  {
    constructor(stage) {
        this.stageId = stage.stageId;
        this.description = stage.description;
        this.name = stage.name;
        this.estimatedHours = stage.estimatedHours;
        this.avgHours = stage.avgHours;
        this.insertedAt = stage.insertedAt;
        this.isDefault = stage.isDefault;
        this.order = stage.order;
    }
}
