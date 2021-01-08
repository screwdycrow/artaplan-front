<template>
  <div class="home" id="content">
    <portal to="toolbar-title"> Dashboard</portal>
    <portal to="toolbar-actions">
    </portal>
    <v-row>
      <v-col sm="12" lg="4">
        <v-card class="fill-height" v-if="ongoingJobs">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>
              <strong class="text--primary"> Today's schedule</strong>
            </v-toolbar-title>
            <v-spacer/>
            <v-chip>4/5 hours</v-chip>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>

          <v-list two-line>
            <schedule-entry-item v-for="entry in scheduleToday" :item="entry"/>
          </v-list>
        </v-card>
      </v-col>
      <v-col sm="12" lg="4">
        <v-card class="fill-height" v-if="scheduleHours && scheduleDays">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>
              <strong class="text--primary"> Workload </strong>
            </v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <work-load-chart :workload="workload"/>
        </v-card>
      </v-col>
    </v-row>
    <v-toolbar flat color="transparent">
      <v-toolbar-title>
        <strong class="text--primary"> Ongoing Jobs ({{ ongoingJobs.length }}) </strong>
      </v-toolbar-title>
      <v-toolbar-items>
      </v-toolbar-items>
      <v-spacer/>
    </v-toolbar>
    <v-row>
      <v-col lg="3" v-for="job in ongoingJobs">
        <v-card :color="job.color" height="100%">
          <v-expansion-panels mandatory value="1" style="background:none;">
            <job-expandable :job="job"/>
          </v-expansion-panels>
        </v-card>
      </v-col>

    </v-row>


    <v-row>
      <v-col>

      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import JobCard from "../components/Jobs/JobCard"
import ScheduleItem from "../components/Schedule/ScheduleEntryItem"
import ScheduleEntry from "@/classes/ScheduleEntry";
import {mapActions, mapGetters, mapState} from "vuex";
import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
import JobPreviewList from "@/components/Jobs/JobPreviewList";
import JobExpandable from "@/components/Jobs/JobExpandable";
import WorkLoadChart from "@/components/Schedule/WorkloadChart";
import jobs from "@/api/jobs";

export default {
  name: 'Home',
  data: () => ({
    scheduleHours: [],
    scheduleDays: []
  }),
  components: {
    WorkLoadChart,
    JobExpandable,
    JobPreviewList,
    ScheduleEntryItem,
    ScheduleItem,
    JobCard,
    HelloWorld
  },
  computed: {
    ...mapGetters('schedule', [
      'scheduleToday',
    ]),
    ...mapState('schedule', [
      'workload'
    ]),
    ...mapGetters('jobs', [
      'ongoingJobs'
    ])
  },
  created() {
    this.getWorkload().then(s => {
      this.scheduleHours = this.workload.map(w => w.hours);
      this.scheduleDays = this.workload.map(w => w.date)

    });
    this.getJobs().then(r => {
      this.getSchedule()
    });
  },
  methods: {
    ...mapActions(
        'schedule',
        [
          'getWorkload',
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
