<template>
  <v-footer
      v-if="timeLogNow !== null"
      color="transparent"
      fixed
      padless
  >
    <v-row
        justify="center"
        no-gutters
    >
      <v-card color="">
        <v-toolbar :color="jobById(timeLogNow.jobId).getFormatedColor(0.4)" flat dense height="30">
          <span> Time Logger </span>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="toggleShowTimeLog()" >
              <v-icon small> mdi-clock</v-icon>
            </v-btn>
            <v-btn icon @click="minimized = !minimized">
              <v-icon v-if="!minimized">mdi-chevron-down</v-icon>
              <v-icon v-if="minimized">mdi-chevron-up</v-icon>
            </v-btn>

          </v-toolbar-items>
        </v-toolbar>
        <v-progress-linear

            buffer-value="0"
            color="primary"
            reverse
            :stream="timer!== null"
            value="0"
        ></v-progress-linear>
        <v-list-item v-if="!minimized">
          <v-list-item-action>
            <v-btn outlined @click="stopTimeLog()" icon large>
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action class="mr-3">
            <v-btn color="primary" v-if="timer !== null" outlined @click="clearTimer()" icon large>
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <v-btn color="primary" v-else @click="startTimer()" outlined icon large>
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ timeLogNow.stageName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{jobById(timeLogNow.jobId).name}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              Duration
            </v-list-item-action-text>
              <time-log-duration :duration="timeLogNow.duration"></time-log-duration>
          </v-list-item-action>
        </v-list-item>
      </v-card>

    </v-row>
  </v-footer>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import TimeLogDuration from "@/components/TimeLogs/TimeLogDuration";

export default {
  name: "TimeLogNow",
  components: {TimeLogDuration},
  data: () => ({
    minimized: false
  }),
  computed: {
    ...mapGetters('timeLogs', [
      'timeLogNow',
      'timer'
    ]),
    ...mapGetters('jobs', [
      'jobById'
    ])
  },
  methods: {
    ...mapActions('timeLogs', [
      'stopTimeLog'
    ]),
    ...mapMutations('timeLogs', [
      'clearTimer',
      'startTimer',
      'toggleShowTimeLog'
    ])
  }
}
</script>

<style scoped>

</style>
