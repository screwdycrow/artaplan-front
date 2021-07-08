<template>

  <v-dialog dark v-model="showTraining" v-if="trainingSession!==null" fullscreen>
    <v-card dark class="fill-height">
      <v-toolbar dense v-if="!finished">
        <v-toolbar-title>
          <v-progress-circular
              style="font-size:0.8em"
              width="2" v-if="remainingTime<= activeImage.time && !transitionPause"
              :value="100 - (remainingTime / activeImage.time)*100">
            {{ remainingTime }}
          </v-progress-circular>
          <v-progress-circular v-else
                               width="2"
                               :value="100 - (remainingTime / activeImage.pause) * 100">
            {{ remainingTime }}
          </v-progress-circular>
        </v-toolbar-title>
        <v-btn color="primary" v-if="!paused" @click="pause()" icon>
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn color="primary" icon @click="jumpToImage(activeImgIndex-1)">
          <v-icon> mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn color="primary" icon @click="jumpToImage(activeImgIndex+1)">
          <v-icon> mdi-skip-next</v-icon>
        </v-btn>
        <v-btn color="primary" v-if="paused" icon @click="start()">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="stop()">
          <v-icon> mdi-stop</v-icon>
          Exit Session
        </v-btn>

      </v-toolbar>
      <v-img v-if="!transitionPause && !finished " :src="activeImage.link" max-height="95vh" contain></v-img>
      <v-row align="center" justify="space-around" class="mt-4" v-if="transitionPause">
        <v-card width="300" outlined>
          <v-card-title> Next Image</v-card-title>
          <v-img height="300" width="300" :src="nextImage.link"></v-img>
          <v-card-actions>
            <v-btn outlined color="primary" @click="skipBreak()"> Skip Break</v-btn>
            <v-btn outlined color="primary" v-if="" @click="jumpToImage(activeImgIndex+2)"> Skip Image</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <v-row align="center" justify="space-around" class="mt-4" v-if="finished">
        <v-card width="300" outlined>
          <v-card-title> Session Finished</v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="stopTraining()"> Exit Session</v-btn>
            <v-btn outlined @click="restartTraining()"> Restart Session</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "TrainingSession",
  data: () => ({}),
  computed: {
    ...mapGetters('training', [
      'activeImage',
      'nextImage',
      'remainingTime',
      'hasNext',
      'hasBack',
      'paused',
    ]),
    ...mapState('training', [
      'activeImgIndex',
      'trainingSession',
      'showTraining',
      'duration',
      'finished',
      'transitionPause'
    ])
  },
  methods: {
    start() {
      this.startTraining();
    },
    ...mapActions('training', [
      'skipBreak',
      'pauseTraining',
      'startTraining',
      'stopTraining',
      'resetTraining',
      'restartTraining',
      'jumpToImage',
    ]),
    ...mapMutations('training', [
      'setTrainingSession',
      'nextPrevImage',
      'toggleShowTraining'
    ]),
    pause() {
      this.pauseTraining();
    },
    stop() {
      this.stopTraining();
    },
    reset() {
      this.resetTraining();
    }
  },
  props: {}
}
</script>
<style scoped>

</style>
