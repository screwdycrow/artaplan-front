<template>
  <div class="home" id="content">
    <portal to="toolbar-title"> Dashboard</portal>
    <portal to="toolbar-actions">
      <v-btn outlined color="primary" class="mr-3" to="/newCustomer"> Add a Customer</v-btn>
      <v-btn outlined color="primary" class="mr-3" to="/newSlot"> Add a Job Template</v-btn>
      <v-btn outlined color="primary" class="mr-3" to="/newJob"> Add a Job</v-btn>
    </portal>

    <v-row>
      <v-col sm="12" lg="3">
        <v-card flat class="fill-height" v-if="schedule">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>
              <strong class="text--primary"> Today's schedule</strong>
            </v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <day-entries :day="days[0]"></day-entries>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat>
          <v-toolbar flat color="transparent">
            <v-toolbar-title>
              <strong class="text--primary"> 7 days schedule</strong>
            </v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
              <v-btn color="secondary" to="/schedule" text>Schedule Management</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-row dense v-if="ongoingJobs.length>0">
              <v-col class="cols-7" v-for="(day, index)   in days" v-if="index > 0 ">
                <day-entries :day="day"></day-entries>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card flat>
          <v-toolbar flat color="transparent">
            <v-toolbar-title>
              <strong class="text--primary"> Ongoing Jobs ({{ ongoingJobs.length }}) </strong>
            </v-toolbar-title>
            <v-spacer/>

            <v-toolbar-items>
              <v-btn color="secondary" to="/jobs" text>Jobs Management</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col>
                <v-row v-if="ongoingJobs.length">
                  <v-col lg="3" v-for="job in ongoingJobs">
                    <job-item  :job="job"></job-item>
                  </v-col>
                </v-row>
                <v-card flat color="transparent" v-else>
                  <v-card-text>
                    There are no ongoing jobs
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card flat>
          <v-toolbar flat>
            <v-toolbar-title> <strong> Quicklinks </strong> </v-toolbar-title>
          </v-toolbar>
            <v-row v-if="ongoingJobs.length">
              <v-col lg="3" v-for="job in ongoingJobs">
                <v-row>
                  <v-col>
                    <v-card-title> {{job.name}}</v-card-title>
                    <v-card-text>
                    <div style="display: inline;" v-for="(hyperlink, index) in job.references.hyperlinks">
                      <v-btn
                          class="mr-3 mb-3"
                          target="_blank" :color="job.getFormatedColor(0.5)"
                          :href="hyperlink.url">
                        <v-icon class="mr-2"> mdi-link</v-icon>
                        {{ hyperlink.title || hyperlink.url }}
                      </v-btn>
                    </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ScheduleItem from "./Schedule/components/ScheduleEntryItem"
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

import JobItem from "./Jobs/components/JobItem"
import moment from "moment"
import JobExpandable from "./Jobs/components/JobExpandable"
import JobPreviewList from "./Jobs/components/JobPreviewList"
import ScheduleEntryItem from "./Schedule/components/ScheduleEntryItem"
import DayEntries from "./Schedule/components/DayEntries"

function WorkLoadChart() {

}

export default {
  name: 'Home',
  data: () => ({
    todaySchedule: [],
    minus: 0,
    plus: 8,
    date: moment(),
  }),
  components: {
    DayEntries,
    JobItem,
    WorkLoadChart,
    JobExpandable,
    JobPreviewList,
    ScheduleEntryItem,
    ScheduleItem,
  },
  computed: {
    ...mapGetters('schedule', [
      'schedule',
      'entriesOfDay',
      'workload',
      'days'
    ]),
    ...mapGetters('jobs', [
      'ongoingJobs'
    ])
  },
  created() {
    this.getJobs().then(r => {
      this.getSchedule().then(() => {
        this.todaySchedule = this.entriesOfDay(moment().format("YYYY-MM-DD"))
        this.makeDays()
      })
    });
  },
  methods: {
    makeDays() {
      this.setDays({date: this.date, minus: this.minus, plus: this.plus});
    },
    ...mapMutations('schedule', [
      "setDays"
    ]),
    ...mapActions(
        'schedule',
        [
          'getSchedule'
        ]
    ),
    ...mapActions(
        'jobs',
        [
          'getJobs'
        ]
    ),
  }
}
</script>
<style scoped>
.cols-7 {
  width: 14%;
  max-width: 14%;
  flex-basis: 14%;
}
</style>
