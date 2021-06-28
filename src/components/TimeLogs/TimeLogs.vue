<template>
  <v-navigation-drawer width="350" style="padding-left:55px" app floating  :value="showTimeLog" left>
    <v-toolbar flat>
      <v-toolbar-title>
        Time Logs
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="toggleShowTimeLog()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row class="pa-3" dense>
      <v-col lg="4" v-for="(jobDuration,jobId) in totalTimeLogDurationPerJob">
        <v-card flat class="fill-height pa-1 text-center" :color="jobById(Number(jobId)).getFormatedColor(0.4)">
            <time-log-duration :duration="jobDuration"/>
        </v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-text v-if="timeLogs.length === 0 ">
        To start logging your time hit the play button on a schedule entry
      </v-card-text>
    </v-card>
    <v-card flat  v-for="(timeLog,index) in timeLogs">
      <v-toolbar dense flat :color="jobById(timeLog.jobId).getFormatedColor(0.4)">
        {{ timeLog.startedAt | formatDate('ddd: HH:mm') }}
        -
        {{ timeLog.endedAt | formatDate('HH:mm') }}
        <v-spacer>
        </v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="removeFromTimeLogs(index)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ timeLog.stageName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ jobById(timeLog.jobId).name }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
            Duration
          </v-list-item-action-text>
          <time-log-duration :duration="timeLog.duration"></time-log-duration>
        </v-list-item-action>
      </v-list-item>
    </v-card>


  </v-navigation-drawer>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import TimeLogDuration from "@/components/TimeLogs/TimeLogDuration";

export default {
  name: "TimeLogs",
  components: {TimeLogDuration},
  computed: {
    ...mapGetters('timeLogs', [
      'totalTimeLogDurationPerJob',
      'showTimeLog',
      'timeLogs'
    ]),
    ...mapGetters('jobs', [
      'jobById'
    ]),
  },
  methods: {

    ...mapMutations('timeLogs', [
      'toggleShowTimeLog'
    ]),
    ...mapActions('timeLogs', [
      'clearTimeLog',
      'removeFromTimeLogs',
      'updateInTimeLogs'

    ])
  }
}
</script>

<style scoped>

</style>
