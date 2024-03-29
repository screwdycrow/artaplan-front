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
        this.customerId = obj.customerId;
        this.slotId = obj.slotId
        this.setReferences(obj.references)
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
        try {
            if (references === '{}' || references === null) {
                console.log('hey', references)
                this.references = {hyperlinks: [], links: [], colors: []}

            } else {
                this.references = JSON.parse(references);
                if (this.references && Object.keys(this.references).length === 0 && obj.constructor === Object) {
                    this.references = {hyperlinks: [], links: [], colors: []}
                }
            }
        } catch (e) {
            this.references = {hyperlinks: [], links: [], colors: []}
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
    isTask(){
      return this.price === 0;
    }
    getHoursLeft() {
        return this.getJobHours() - this.getHoursSpent();
    }

    getValue() {
        if (this.status !== Job.STATUS.FINISHED) {
            let hoursLeft = this.getHoursLeft();
            let addedHours = hoursLeft < 0 ? -1 * hoursLeft : 0
            return this.price / (this.getJobHours() + addedHours);
        } else {
            return this.price / this.getHoursSpent();
        }

    }

    getJobColor(format) {
        const color = this.color.trim();
        switch (format) {
            case undefined:
                return color;
            case 'hex':
                return tinycolor(color).toHexString()
            case 'rgb':
                return tinycolor(color).toRgbString();
        }
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

    reopen() {
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
