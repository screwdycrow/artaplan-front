<template>
  <div>
    <portal to="toolbar-title">
      Schedule
    </portal>
    <portal to="toolbar-items">
    </portal>
    <portal to="toolbar-actions">

    </portal>
    <v-row>
      <v-col lg="2">
        <v-card flat>
          <v-toolbar flat dense>
            <v-toolbar-title>
              Ongoing Jobs
            </v-toolbar-title>
          </v-toolbar>
          <job-preview-list :jobs="ongoingJobs"></job-preview-list>
          <v-alert type="info" v-if="ongoingJobs.length === 0"  outlined>
            There are no ongoing jobs at the moment, you need to start a job in order to
            appear here.
          </v-alert>
        </v-card>
        <v-card flat class="mt-4">
          <v-toolbar flat dense>
            <v-toolbar-title>
              Ongoing Tasks
            </v-toolbar-title>
          </v-toolbar>
          <job-preview-list :jobs="ongoingTasks"></job-preview-list>
          <v-alert type="info" v-if="ongoingTasks.length === 0"  outlined>
            There are no ongoing jobs at the moment, you need to start a job in order to
            appear here.
          </v-alert>
        </v-card>
      </v-col>
      <v-col lg="10">
        <v-card flat>
          <v-toolbar flat dense="">
            <v-toolbar-title>
              3-Week Schedule
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="changeDays(-7)" rounded>
              <v-icon> mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon="" @click="changeDays(+7)" rounded>
              <v-icon> mdi-chevron-down</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row dense>
              <v-col class="cols-7" v-for="day in days">
                <day-entries :day="day"></day-entries>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

  </div>
</template>

<script>
import ScheduleEntry from "@/classes/ScheduleEntry";

import {mapActions, mapGetters, mapMutations} from 'vuex';
import jobs from "@/api/jobs";
import moment from "moment"
import DayEntries from "./components/DayEntries"
import JobPreviewList from "../Jobs/components/JobPreviewList"
import JobExpandable from "../Jobs/components/JobExpandable"
import ScheduleEntryItem from "./components/ScheduleEntryItem"
import AverageWorkHours from "@/views/Schedule/components/AverageWorkHours";
import WorkHoursChart from "@/views/Schedule/components/WorkHoursChart";

export default {
  name: "Schedule",
  components: {WorkHoursChart, AverageWorkHours, DayEntries, JobPreviewList, JobExpandable, ScheduleEntryItem},

  data: () => ({
    minus: -1,
    plus: 20,
    date: moment(),
  }),
  created() {
    this.getJobs();
    this.getSchedule()
        .then(() => this.makeDays())

  },

  computed: {
    ...mapGetters(
        'schedule',
        [
          "days",
        ]),

    ...mapGetters(
        'jobs',
        [
          "ongoingJobs",
          "ongoingTasks"
        ])
  },
  methods: {
    changeDays(days) {
      this.date.add(days, 'days')
      this.makeDays();
    },
    makeDays() {
      this.setDays({date: this.date, minus: this.minus, plus: this.plus});
    },
    ...mapMutations(
        'schedule',
        [
          "setDays"
        ]
    ),
    ...mapActions(
        'jobs',
        [
          "getJobs",

        ]
    ),
    ...mapActions(
        'schedule',
        [
          "getSchedule"

        ]
    ),
  }
}
</script>

<style scoped>
.cols-7 {
  width: 14.2%;
  max-width: 14.2%;
  flex-basis: 14.2%;
}
</style>
