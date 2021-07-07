<template>

  <v-dialog dark v-model="showTraining" fullscreen>
    <v-card dark>
      <v-img v-if="!transitionPause" v-key="activeImage.link" :src="activeImage.link" max-height="95vh" contain></v-img>
      <v-toolbar bottom>
        <v-toolbar-title>
          {{ duration }}
          {{nextChange}}
          {{ activeImage }}
        </v-toolbar-title>
        <v-toolbar-items>
          <v-btn color="primary" outlined @click="pause()" icon>
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn color="primary" outlined @click="start()">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "TrainingSession",
  data: () => ({
    stageId: []
  }),
  computed: {
    ...mapGetters('training', [
      'activeImage',
    ]),
    ...mapState('training', [
      'nextChange',
      'trainingSession',
      'showTraining',
      'duration',
      'transitionPause'
    ])
  },
  methods: {
    start() {
      this.startTraining();
    },
    ...mapActions('training', [
      'pauseTraining',
      'startTraining',
      'stopTraining',
      'resetTraining'
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
