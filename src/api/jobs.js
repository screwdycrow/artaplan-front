const Job = {
    status:"completed",
    name: "Wisnlow Hunter Commission ",
    jobId: 1,
    price: 45,
    slotId: 1,
    slotName: "Character Design",
    customerName: "Winslow",
    started: "3/3/2020",
    references:[
        "https://www.pinterest.com/pinterest/official-news/"
    ],
    deliverables:[

    ],
    stages:[
        {
            isFinal:true,
            stageId:1,
            description:"Make a few rough concepts for the artwork",
            name: "Flat Colouring",
            estimatedHours: 4,
            jobHours:5,
            completedHours:2,
            deadline:"12/3/2020"
        },
    ]
};
const jobs = [
    {
        status:"completed",
        name: "Wisnlow Hunter Commission ",
        jobId: 1,
        price: 45,
        slotId: 1,
        slotName: "Character Design",
        customerName: "Winslow"
    },
    {
        name: "Wisnlow Hunter Commission ",
        jobId: 2,
        price: 45,
        slotId: 1,
        slotName: "Character Design",
        customerName: "Winslow"
    },
    {
        name: "Wisnlow Hunter Commission ",
        jobId: 3,
        price: 45,
        slotId: 1,
        slotName: "Character Design",
        customerName: "Winslow"
    },
];

export  default {
    getJobs(){
        return Promise.resolve(jobs);
    },
    getSlot(){
      return Promise.resolve(job);
    }
}
