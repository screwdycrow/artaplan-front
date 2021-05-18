import JobStage from "@/classes/JobStage";
import Slot from "@/classes/Slot";
import Customer from "@/classes/Customer";
import tinycolor from 'tinycolor2'
import moment from 'moment';

export default class Job {

    static STATUS = {
        IDLE: 'idle',
        ONGOING: 'ongoing',
        FINISHED: 'finished',
        SCHEDULED: 'scheduled',
        CANCELLED: 'cancelled',
    };

    constructor(obj) {
        this.userId = obj.userId;
        this.jobId = obj.jobId;
        this.status = obj.status || 'idle'
        this.color = obj.color;
        this.image = obj.image;
        this.name = obj.name;
        this.description = obj.description;
        this.toStartAt = obj.toStartAt;
        this.startedAt = obj.startedAt;
        this.finishedAt = obj.finishedAt;
        this.cancelledAt = obj.cancelledAt;
        this.price = obj.price;
        this.priority = obj.priority;
        this.insertedAt = obj.insertedAt;
        this.deadline = obj.deadline;
        this.references = null;
        this.customerId = obj.customerId;
        this.slotId = obj.slotId
        if (obj.references){
            this.setReferences(obj.references)
        }else{
            this.references = {}
        }
        this.slot = {};
        if (obj.slot) this.setSlot(obj.slot);
        if (obj.customer) this.setCustomer(obj.customer);
        this.jobStages = [];
        if (obj.jobStages) this.setJobStages(obj.jobStages);
    }

    setCustomer(customer) {
        this.customer = new Customer(customer);
    }

    setSlot(slot) {
        this.slot = new Slot(slot);
    }

    setReferences(references) {
        console.log(references);
        try{
            this.references = JSON.parse(references);
        }catch (e) {
            this.references = {}
        }
    }

    setJobStages(jobStages) {
        this.jobStages = jobStages.map(js => new JobStage(js))
    }

    getFormatedColor(alpha) {
        const color = tinycolor(this.getJobColor());
        color.setAlpha(alpha);
        return color.toHex8String()
    }

    getHoursSpent() {
        let workHours = 0;
        this.jobStages.forEach(js => {
            workHours += js.workHours;
        });
        return workHours
    }

    getJobHours() {
        let jobHours = 0;
        this.jobStages.forEach(js => {
            jobHours += js.jobHours;
        });
        return jobHours;
    }

    getHoursLeft() {
        return this.getJobHours() - this.getHoursSpent();
    }

    getValue() {
        let hoursLeft = this.getHoursLeft();
        let addedHours = hoursLeft<0? -1*hoursLeft:0
        return this.price / (this.getJobHours() + addedHours);
    }

    getJobColor() {
        return (this.status === this.status.FINISHED) ? 'grey' : this.color.trim();
    }

    getCompletionPercentage() {
        let jobHours = 0;
        let workHours = 0;
        this.jobStages.forEach(js => {
            jobHours += js.jobHours;
            workHours += js.workHours;
        });
        return ((workHours / jobHours) * 100).toFixed(0);
    }

    reopen(){
        this.status = Job.STATUS.ONGOING;
    }
    markJobAsOngoing() {
        this.status = Job.STATUS.ONGOING;
        this.startedAt = moment().toISOString()
    }

    markJobAsFinished() {
        this.status = Job.STATUS.FINISHED;
        this.finishedAt = moment().toISOString()
    }

    markJobAsScheduled(date) {
        this.status = Job.STATUS.SCHEDULED;
        this.toStartAt = moment(date).toISOString()
    }

    markJobAsCancelled() {
        this.status = Job.STATUS.CANCELLED;
        this.cancelledAt = moment().toISOString()
    }

    setDeadline(date) {
        this.job.deadline = moment(state).toISOString()
    }

    isOverWork() {
        return this.getJobHours() < this.getHoursSpent();
    }

    getFormattedDeadline(mode) {
        const now = moment(new Date());
        const deadline = moment(this.deadline);
        switch (mode) {
            case 'days':
                return moment.duration(deadline.diff(now)).asDays().toFixed(0);
        }
    }
}
