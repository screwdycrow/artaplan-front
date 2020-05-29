import JobStage from "@/classes/JobStage";
import Slot from "@/classes/Slot";
import Customer from "@/classes/Customer";
import tinycolor from 'tinycolor2'
import moment from 'moment';

export default class {

    static status = {
        IDLE:'idle',
        STARTED: 'started',
        FINISHED: 'finished',
        SCHEDULED: 'scheduled',
    };

    constructor(obj) {
        this.jobId = obj.jobId;
        this.status = obj.status;
        this.color = obj.color;
        this.image = obj.image;
        this.name = obj.name;
        this.toStartAt = obj.toStartAt;
        this.startedAt = obj.startedAt;
        this.price = obj.price;
        this.priority = obj.priority;
        this.insertedAt = obj.insertedAt;
        this.deadline = obj.deadline;
        this.references = {};
        if (obj.references) this.setReferences(obj.references);
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
        this.references = JSON.parse(references);
    }

    setJobStages(jobStages) {
        this.jobStages = jobStages.map(js => new JobStage(js))
    }

    getFormatedColor(alpha) {
        const color = tinycolor(this.getJobColor());
        color.setAlpha(alpha);
        return color.toHex8String()
    }
    getJobColor(){
        return (this.status === this.status.FINISHED)?'grey':this.color;
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

    getFormattedDeadline(mode) {
        const now = moment(new Date());
        const deadline = moment(this.deadline);
        switch (mode) {
            case 'days':
                return moment.duration(deadline.diff(now)).asDays().toFixed(0);
        }
    }
}
