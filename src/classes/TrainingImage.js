export default class TrainingImage {
    constructor({link, time, pause,thumbnail}) {
        this.link = link
        this.pause = pause || 5
        this.time = time || 10
        this.thumbnail = thumbnail || link
    }
    totalTime(){
        return this.pause + this.time;
    }
}
