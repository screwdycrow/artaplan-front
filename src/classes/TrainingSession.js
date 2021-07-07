import TrainingImage from "@/classes/TrainingImage";

export default class TrainingSession {
    constructor(obj) {
        this.jobId = obj.jobId;
        this.setImages(obj.images)
    }

    setImages(images) {
        if (images) {
            this.images = images.map(image => new TrainingImage(image))
        } else {
            this.images = []
        }
    }
}
