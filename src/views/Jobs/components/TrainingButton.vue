<template>
  <v-dialog max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-on="on" v-bind="attrs"> Go to training</v-btn>
    </template>
    <v-card>
      <v-card-title> Set Training Session</v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="mt-4">
            <v-col lg="5">
              <v-text-field full-width outlined type="number" min="1" v-model="timePerImage" label="set time for all images">
                <template v-slot:append>
                  sec
                </template>
              </v-text-field>
            </v-col>
            <v-col lg="5">
              <v-text-field full-width outlined type="number" min="1" v-model="timePerPause"
                            label="set pause time for all images">
                <template v-slot:append>
                  sec
                </template>
              </v-text-field>
            </v-col>
            <v-col lg="2">
              <v-btn color="primary" @click="setToAll()"> Set</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-list dense>
        <draggable v-model="trainingImages">
          <v-list-item ripple v-for="image in trainingImages">
            <v-list-item-action>
              <v-icon>mdi-drag</v-icon>
            </v-list-item-action>
            <v-list-item-action>
              <v-img height="70" width="70" contain :src="image.link"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-text-field outlined style="width:180px" type="number" label="Time per image" v-model="image.time">
                <template v-slot:append>
                  sec
                </template>
              </v-text-field>
            </v-list-item-action>
            <v-list-item-action>
              <v-text-field outlined style="width:180px" type="number" label="Pause time per image"
                            v-model="image.pause">
                <template v-slot:append>
                  sec
                </template>
              </v-text-field>
            </v-list-item-action>

          </v-list-item>
        </draggable>

      </v-list>
      <v-card-text>
        <v-form>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="start()"> Start Training Session</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import Job from "@/classes/Job";
import TrainingImage from "@/classes/TrainingImage";
import draggable from 'vuedraggable';

export default {
  name: "TrainingButton",

  data: () => ({
    timePerImage: 10,
    timePerPause: 5,
    trainingImages: [],
  }),
  components: {draggable},
  props: {
    images: {type: Array, default: null, required: false},
    job: {type: Job, default: null, required: false}
  },
  mounted() {
    this.trainingImages = this.images.map(image => new TrainingImage({link: image}));
  },
  watch: {
    images() {
      this.trainingImages = this.images.map(image => new TrainingImage({link: image}));
    }
  },
  methods: {
    ...mapMutations('training', [
      'setTrainingSession'
    ]),
    ...mapActions('training', [
      'startTraining',
      'resetTraining',
      'pauseTraining'
    ]),
    start() {
      this.setTrainingSession({
        images: this.trainingImages,
        jobId: this.job.jobId,
      })
      this.pauseTraining();
      this.resetTraining();
      this.startTraining();
    },
    setToAll() {
      if (this.timePerImage && this.timePerPause) {
        this.trainingImages.forEach(image => {
          image.pause = this.timePerPause;
          image.time = this.timePerImage
        })
      } else {
        alert('Times must be greater than 0.')
      }
    }
  }
}
</script>

<style scoped>

</style>
