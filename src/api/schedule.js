const schedule= [
    {
        scheduleEntryId: 1,
        jobId:1,
        jobStageId: 2,
        scheduledAt: "2020-05-21",
        isDeadline: false,
        done: false,
        hours: 1,
    },
    {
        scheduleEntryId: 3,
        jobId:2,
        jobStageId: 2,
        scheduledAt: "2020-05-21",
        isDeadline: false,
        done: false,
        hours: 1,
    },
    {
        scheduleEntryId: 2,
        jobId:2,
        jobStageId: 2,
        scheduledAt: "2020-05-31",
        isDeadline: false,
        done: false,
        hours: 1,
    },
];

export  default {
    getSchedule(){
        return Promise.resolve(schedule)
    }
}
