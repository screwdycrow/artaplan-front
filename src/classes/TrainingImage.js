export default class TrainingImage {
    constructor({link, time, pause}) {
        this.link = link
        this.pause = time || 5
        this.time = pause || 30
    }
    totalTime(){
        return this.pause + this.time;
    }
}
