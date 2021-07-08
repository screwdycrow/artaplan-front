export default class TrainingImage {
    constructor({link, time, pause}) {
        this.link = link
        this.pause = pause || 5
        this.time = time || 10
    }
    totalTime(){
        return this.pause + this.time;
    }
}
