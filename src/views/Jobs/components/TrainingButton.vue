<template>
  <v-dialog max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-on="on" v-bind="attrs"> Go to training</v-btn>
    </template>
    <v-card>
      <v-toolbar style="position: sticky; top:0; z-index:500">
        <v-toolbar-title>Training Session</v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="mr-4">Images:{{ selected.length }} </span>
        <span class="mr-4">Total time: {{ (totalTime / 60)|fixed(2) }}m </span>
        <span class="mr-4">With breaks: {{ ((totalTime + totalPauseTime) / 60) |fixed(2) }}m </span>
        <v-btn color="primary" type="submit" :disabled="!valid" @click="start()"> Start Training Session</v-btn>
      </v-toolbar>
      <v-form v-model="validSet">

        <v-card-text>
          <v-row class="mt-4">
            <v-col lg="5">
              <v-text-field required dense :rules="rules" dense filled type="number" min="1"
                            v-model.number="timePerImage"
                            label="set time for all images" @change="hackUpdate++">
                <template v-slot:append>
                  sec
                </template>
              </v-text-field>
            </v-col>
            <v-col lg="5">
              <v-text-field required dense :rules="rules" dense filled type="number" min="1"
                            v-model.number="timePerPause"
                            label="set pause time for all images" @change="hackUpdate++">
                <template v-slot:append>
                  sec
                </template>
              </v-text-field>
            </v-col>
            <v-col lg="2">
              <v-btn color="primary" :disabled="!validSet" outlined @click="setToAll()"> Set</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-form v-model="valid">
        <v-card-title> Images</v-card-title>
        <v-list dense>
          <draggable v-model="trainingImages">
            <v-list-item ripple v-for="image in trainingImages">
              <v-list-item-action>
                <v-icon>mdi-drag</v-icon>
              </v-list-item-action>
              <v-list-item-action>
                <v-checkbox v-model="image.selected"></v-checkbox>
              </v-list-item-action>
              <v-list-item-action class="ml-2">
                <v-img height="70" width="70" contain :src="image.link"/>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-text-field dense :rules="rules" outlined style="width:180px" type="number" label="Time per image"
                              v-model.number="image.time" @change="hackUpdate++">
                  <template v-slot:append>
                    sec
                  </template>
                </v-text-field>
              </v-list-item-action>
              <v-list-item-action>
                <v-text-field :rules="rules" dense outlined style="width:180px" type="number"
                              label="Pause time per image"
                              v-model.number="image.pause" @change="hackUpdate++">
                  <template v-slot:append>
                    sec
                  </template>
                </v-text-field>
              </v-list-item-action>

            </v-list-item>
          </draggable>

        </v-list>
        <v-card-text>

        </v-card-text>
      </v-form>
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
    hackUpdate: 0,
    timePerImage: 10,
    timePerPause: 5,
    trainingImages: [],
    rules: [
      value => !!value || 'required'
    ],
    valid: true,
    validSet: true
  }),
  components: {draggable},
  props: {
    images: {type: Array, default: null, required: false},
    job: {type: Job, default: null, required: false}
  },
  computed: {
    selected() {
      return this.trainingImages.filter(i => i.selected === true);
    },
    totalTime() {
      this.hackUpdate
      return this.trainingImages
          .filter(i => i.selected === true)
          .reduce((acc, next) => acc + (next.time || 1), 0)
    },
    totalPauseTime() {
      this.hackUpdate
      return this.trainingImages
          .filter(i => i.selected === true)
          .reduce((acc, next) => acc + (next.pause || 1), 0)
    },
  },
  mounted() {
    this.trainingImages = this.images.map(image => {
      let trainingImage = new TrainingImage({link: image})
      trainingImage.selected = true;
      return trainingImage;
    });
  },
  watch: {
    images() {
      this.trainingImages = this.images.map(image => {
        let trainingImage = new TrainingImage({link: image})
        trainingImage.selected = true;
        return trainingImage;
      });
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
        images: this.trainingImages.filter(i => i.selected === true),
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
