const Job = {
    jobId: 1,
    status: "ongoing",
    color: "blue",
    image: "https://cdnb.artstation.com/p/assets/images/images/026/484/381/large/dimitris-tzilivakis-fina4.jpg",
    toStartAt: "2020-05-11",
    price: 40,
    name: "jay Full body",
    priority: 1,
    insertedAt: "2020-05-11",
    deadline: "2020-06-01",
    references: "",
    customer: {
        name: "Evi Ouzounidou"
    }
};
const jobs = [
    {
        jobId: 1,
        status: "started",
        color: "#1b4aad",
        image: "https://cdnb.artstation.com/p/assets/images/images/026/484/381/large/dimitris-tzilivakis-fina4.jpg",
        toStartAt: "2020-05-11",
        startedAt: "2020-05-11",
        finishedAt: null,
        price: 40,
        name: "Jay Full body ",
        priority: 1,
        insertedAt: "2020-05-11",
        deadline: "2020-06-01",
        references: "",
        customer: {
            name: "test"
        },
        slotId: 2,
        slot: {
            name: "Full Body Design",
        },
        jobStages: [
            {
                jobStageId: 2,
                jobId: 1,
                stageId: 2,
                order: 1,
                jobHours: 2,
                workHours: 2,
                stage: {
                    stageId: 2,
                    name: "poses",
                    description: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },

            },
            {
                jobStageId: 3,
                jobId: 1,
                stageId: 2,
                order: 1,
                jobHours: 2,
                workHours: 1,
                stage: {
                    stageId: 2,
                    name: "poses",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },
            },
            {
                jobStageId: 4,
                jobId: 1,
                stageId: 2,
                order: 2,
                jobHours: 2,
                workHours: 0,
                stage: {
                    stageId: 2,
                    name: "halfRender",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },
            },
        ]
    },
    {
        jobId: 2,
        status: "started",
        color: "#cd6d1c",
        image: "https://cdnb.artstation.com/p/assets/images/images/026/484/381/large/dimitris-tzilivakis-fina4.jpg",
        toStartAt: "2020-05-11",
        startedAt: "2020-05-11",
        finishedAt: null,
        price: 40,
        name: "Black Knight",
        priority: 1,
        insertedAt: "2020-05-11",
        deadline: "2020-06-01",
        references: "",
        customer: {
            name: "Thomas Dimensor"
        },
        jobStages: [
            {
                jobStageId: 2,
                jobId: 2,
                stageId: 2,
                order: 1,
                jobHours: 2,
                workHours: 2,
                stage: {
                    stageId: 2,
                    name: "poses",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },

            },
            {
                jobStageId: 3,
                jobId: 2,
                stageId: 2,
                order: 1,
                jobHours: 2,
                workHours: 1,
                stage: {
                    stageId: 2,
                    name: "poses",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },
            },
            {
                jobStageId: 4,
                jobId: 2,
                stageId: 2,
                order: 2,
                jobHours: 2,
                workHours: 0,
                stage: {
                    stageId: 2,
                    name: "halfRender",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },
            },
        ]
    },
    {
        jobId: 3,
        status: "started",
        color: "#cb2c24",
        image: "https://cdnb.artstation.com/p/assets/images/images/026/484/381/large/dimitris-tzilivakis-fina4.jpg",
        toStartAt: "2020-05-11",
        startedAt: "2020-05-11",
        finishedAt: null,
        price: 40,
        name: "Stormwind Knight",
        priority: 1,
        insertedAt: "2020-05-11",
        deadline: "2020-06-01",
        references: "",
        customer: {
            name: "Wynslow"
        },
        jobStages: [
            {
                jobStageId: 2,
                jobId: 1,
                stageId: 2,
                order: 1,
                jobHours: 2,
                workHours: 2,
                stage: {
                    stageId: 2,
                    name: "poses",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },

            },
            {
                jobStageId: 3,
                jobId: 1,
                stageId: 2,
                order: 1,
                jobHours: 2,
                workHours: 1,
                stage: {
                    stageId: 2,
                    name: "poses",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },
            },
            {
                jobStageId: 4,
                jobId: 1,
                stageId: 2,
                order: 2,
                jobHours: 2,
                workHours: 0,
                stage: {
                    stageId: 2,
                    name: "halfRender",
                    desription: "collect poses references and make poses",
                    avgHours: 5,
                    insertedAt: "2020-03-20",
                    estimatedHours: 5
                },
            },
        ]
    },
];

export default {
    getJobs(type) {
        return Promise.resolve(jobs);
    },
    getJob() {
        return Promise.resolve(job);
    }
}
