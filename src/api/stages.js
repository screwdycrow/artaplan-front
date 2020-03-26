const stages = [
    {
        stageId: 1,
        description: "Make a few rough concepts for the artwork",
        name: "Thumbnails",
        estimatedHours: 3,
        avgHours: 4.3
    },
    {
        stageId: 2,
        description: "Make a few rough concepts for the artwork",
        name: "Flat Colouring",
        estimatedHours: 3,
        avgHours: 3.2
    },
    {
        stageId: 3,
        description: "Make a few rough concepts for the artwork",
        name: "Half Render",
        estimatedHours: 3,
        avgHours: 5
    },
    {
        stageId: 4,
        description: "Make a few rough concepts for the artwork",
        name: "Full Render",
        estimatedHours: 3,
        avgHours: 4
    },
    {
        stageId: 5,
        description: "Make a few rough concepts for the artwork",
        name: "Deliver",
        estimatedHours: 1,
        avgHours: 3
    },
];

export default {
    getStages() {
        return Promise.resolve(stages);
    },
    getStagesOf(){

    }
}
