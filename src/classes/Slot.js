import Stage from "@/classes/Stage";

export default class {
    constructor(slot) {
        this.slotId = slot.slotId;
        this.name = slot.name;
        this.price = slot.price;
        this.notes = slot.notes;
        this.description = slot.description;
        this.userId = slot.userId;
        this.stages = [];
        if (slot.stages) this.setStages(slot.stages)
    }

    setStages(stages) {
        this.stages = stages.map(s => new Stage(s))
    }
    getDefaultStages() {
      return  this.stages.filter(s=>s.isDefault)
    }
}
