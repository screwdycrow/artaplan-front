<template>
  <v-navigation-drawer width="350" style="padding-left:55px"  app fixed :value="showTimeLog"    left>
      <v-toolbar flat>
        <v-toolbar-title>
            Time Logs
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon  @click="toggleShowTimeLog()">
          <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

            <v-card flat>
              <v-card-text v-if="timeLogs.length === 0 ">
                To start logging your time hit the play button on a schedule entry
              </v-card-text>
            </v-card>
            <v-card flat v-for="(timeLog,index) in timeLogs" >
              <v-toolbar dense flat :color="jobById(timeLog.jobId).getFormatedColor(0.4)">
                  {{timeLog.startedAt | formatDate('ddd: HH:mm')}}
                  -
                  {{timeLog.endedAt | formatDate('HH:mm')}}
                <v-spacer>
                </v-spacer>
                <v-toolbar-items>
                  <v-btn  icon @click="removeFromTimeLogs(index)">
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
                    {{jobById(timeLog.jobId).name}}
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
        'showTimeLog',
        'timeLogs'
    ]),
    ...mapGetters('jobs', [
      'jobById'
    ]),
  },
  methods: {

    ...mapMutations('timeLogs',[
        'toggleShowTimeLog'
    ]),
    ...mapActions('timeLogs',[
        'clearTimeLog',
        'removeFromTimeLogs',
        'updateInTimeLogs'

    ])
  }
}
</script>

<style scoped>

</style>
