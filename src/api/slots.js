const slot =
    {
        slotId: 1,
        name: "Character Design",
        price: 45,
        stages: [
            {
                stageId:1,
                description:"Make a few rough concepts for the artwork",
                name: "Thumbnails",
                isDefault:true,
                estimatedHours: 3,
                avgHours:4.3
            },
            {
                stageId:2,
                description:"Make a few rough concepts for the artwork",
                name: "Flat Colouring",
                isDefault:true,
                estimatedHours: 3,
                avgHours:3.2
            },
            {
                stageId:3,
                description:"Make a few rough concepts for the artwork",
                name: "Half Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours:5
            },
            {
                stageId:4,
                description:"Make a few rough concepts for the artwork",
                name: "Full Render",
                isDefault:true,
                estimatedHours: 3,
                avgHours: 4
            },
            {
                stageId:5,
                description:"Make a few rough concepts for the artwork",
                name: "Deliver",
                isDefault:false,
                estimatedHours: 1,
                avgHours:3
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
        name: "Character Design"
    },
    {
        slotId: 2,
        name: "Character Design 2"
    },
];

export default {
    getSlots() {
        return Promise.resolve(slots);
    },
    getSlot(slotId) {
        return Promise.resolve(slot)
    }
}

