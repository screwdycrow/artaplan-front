const slot =
    {
        slotId: 1,
        name: "Character Design",
        price: 45,
        stages: [
            {
                insertedAt:"12/3/2020",
                stageId:1,
                description:"Make a few rough concepts for the artwork",
                name: "Thumbnails",
                isDefault:true,
                estimatedHours: 3,
                avgHours:4.3,
                order:1
            },
            {
                insertedAt:"12/3/2020",
                stageId:2,
                description:"Make a few rough concepts for the artwork",
                name: "Flat Colouring",
                isDefault:true,
                estimatedHours: 3,
                avgHours:3.2,
                order:2
            },
            {
                insertedAt:"12/3/2020",
                stageId:3,
                description:"Make a few rough concepts for the artwork",
                name: "Half Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours:5,
                order:3
            },
            {
                insertedAt:"12/3/2020",
                stageId:4,
                description:"Make a few rough concepts for the artwork",
                name: "Full Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours: 4,
                order:4,
            },
            {
                insertedAt:"12/3/2020",
                stageId:5,
                description:"Make a few rough concepts for the artwork",
                name: "Deliver",
                isDefault:false,
                estimatedHours: 1,
                avgHours:3,
                order:5,
            },
        ],
        commissions: [],
        notes: [
            'How I work: Hello My name Joe, my surename is Doe, and I am extremely distracted all the time, you dont want to work with me'
        ]
    };

const slots = [
    {
        slotId: 1,
        price: "30",
        name: "Character Design",
        description: "It's all about character design to be honest",
        notes:"",
        stages:[
            {
                insertedAt:"12/3/2020",
                stageId:1,
                description:"Make a few rough concepts for the artwork",
                name: "Thumbnails",
                isDefault:true,
                estimatedHours: 3,
                avgHours:4.3,
                order:1
            },
            {
                insertedAt:"12/3/2020",
                stageId:2,
                description:"Make a few rough concepts for the artwork",
                name: "Flat Colouring",
                isDefault:true,
                estimatedHours: 3,
                avgHours:3.2,
                order:2
            },
            {
                insertedAt:"12/3/2020",
                stageId:3,
                description:"Make a few rough concepts for the artwork",
                name: "Half Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours:5,
                order:3
            },
            {
                insertedAt:"12/3/2020",
                stageId:4,
                description:"Make a few rough concepts for the artwork",
                name: "Full Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours: 4,
                order:4
            },
            {
                insertedAt:"12/3/2020",
                stageId:5,
                description:"Make a few rough concepts for the artwork",
                name: "Deliver",
                isDefault:false,
                estimatedHours: 1,
                avgHours:3,
                order:5
            },
        ],
        jobCount:1
    },
    {
        slotId: 2,
        price: "30",
        name: "Character Design 2",
        notes:"",
        stages:[
            {
                insertedAt:"12/3/2020",
                stageId:1,
                description:"Make a few rough concepts for the artwork",
                name: "Thumbnails",
                isDefault:true,
                estimatedHours: 3,
                avgHours:4.3,
                order:1,
            },
            {
                insertedAt:"12/3/2020",
                stageId:2,
                description:"Make a few rough concepts for the artwork",
                name: "Flat Colouring",
                isDefault:true,
                estimatedHours: 3,
                avgHours:3.2,
                order:2,
            },
            {
                insertedAt:"12/3/2020",
                stageId:3,
                description:"Make a few rough concepts for the artwork",
                name: "Half Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours:5,
                order:3,
            },
            {
                insertedAt:"12/3/2020",
                stageId:4,
                description:"Make a few rough concepts for the artwork",
                name: "Full Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours: 4,
                order:4,
            },
            {
                insertedAt:"12/3/2020",
                stageId:5,
                description:"Make a few rough concepts for the artwork",
                name: "Deliver",
                isDefault:false,
                estimatedHours: 1,
                avgHours:3,
                order:5,
            },
        ],
        description: "It's all about character design to be honest but with a twist :P ",
        jobCount:0
    },
];

export default {
    insertStageToSlot(stage){
      return Promise.resolve(stage)
    },
    toggleStageDefault(stage){
        return Promise.resolve(stage);
    },
    getSlots() {
        return Promise.resolve(slots);
    },
    getSlot(slotId) {
        return Promise.resolve(slot)
    }
}

