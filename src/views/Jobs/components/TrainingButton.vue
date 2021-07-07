<template>
  <v-dialog max-width="1000" >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-on="on" v-bind="attrs"> Go to training</v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item v-for="image in trainingImages">
          <v-list-item-action>
            <v-img height="70"  width="70" contain :src="image.link"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ image.link }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-text-field style="width:120px" type="number" label="Time per image" v-model="image.time">
              <template v-slot:append>
                sec
              </template>
            </v-text-field>
          </v-list-item-action>
          <v-list-item-action>
            <v-text-field style="width:120px" type="number" label="Pause time per image" v-model="image.pause">
              <template v-slot:append>
                sec
              </template>
            </v-text-field>
          </v-list-item-action>

        </v-list-item>
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

export default {
  name: "TrainingButton",

  data: () => ({
    trainingImages: [],
  }),
  props: {
    images: {type: Array, default: null, required: false},
    job: {type: Job, default: null, required: false}
  },
  mounted(){
    this.trainingImages = this.images.map(image => new TrainingImage({link: image}));
  },
  watch: {
    images() {
      this.trainingImages = this.images.map(image =>new TrainingImage({link: image}));
    }
  },
  methods: {
    ...mapMutations('training', [
      'setTrainingSession'
    ]),
    ...mapActions('training', [
      'startTraining'
    ]),
    start() {
      this.setTrainingSession({
        images: this.trainingImages,
        jobId: this.job.jobId,
      })
      this.startTraining();
    }
  }
}
</script>

<style scoped>

</style>
