const slot =
    {
        slotId: 1,
        name: "Character Design",
        price: 45,
        stages: [
            {
                description:"Make a few rough concepts for the artwork",
                name: "Thumbnails",
                estimatedHours: 3,
                avgHours:4.3
            },
            {
                description:"Make a few rough concepts for the artwork",
                name: "Flat Colouring",
                estimatedHours: 3,
                avgHours:3.2
            },
            {
                description:"Make a few rough concepts for the artwork",
                name: "Half Render",
                estimatedHours: 3,
                avgHours:5
            },
            {
                description:"Make a few rough concepts for the artwork",
                name: "Full Render",
                estimatedHours: 3,
                avgHours: 4
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

