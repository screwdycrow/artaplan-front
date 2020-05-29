const schedule= [
    {
        scheduleEntryId: 1,
        jobId:1,
        jobStageId: 2,
        scheduledAt: "2020-05-28",
        isDeadline: false,
        done: false,
        hours: 1,
    },
    {
        scheduleEntryId: 3,
        jobId:2,
        jobStageId: 2,
        scheduledAt: "2020-05-28",
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

const workload = [
    {
        date:"2020-05-28",
        hours:5
    },
    {
        date:"2020-05-29",
        hours:2
    },
    {
        date:"2020-05-30",
        hours:2
    },
    {
        date:"2020-05-31",
        hours:4
    },
    {
        date:"2020-06-01",
        hours:4
    },  {
        date:"2020-06-02",
        hours:1
    }
];

export  default {
    getSchedule(){
        return Promise.resolve(schedule)
    },
    getWorkload(){
        return Promise.resolve(workload)
    }
}
