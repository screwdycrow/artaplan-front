<template>
  <div>
    <portal to="toolbar-title">
      Jobs
    </portal>
    <portal to="toolbar-items">
    </portal>
    <portal to="toolbar-actions">
      <v-btn color="primary" to="/newJob">
        <v-icon> mdi-plus</v-icon>
        New
      </v-btn>
    </portal>
    <v-row>
      <v-col sm="12" lg="10">
        <v-card flat>
          <v-card-title> Ongoing</v-card-title>
          <v-tabs>
            <v-tab>
              Jobs ({{ ongoingJobs.length }})
            </v-tab>
            <v-tab>
              Tasks ({{ ongoingTasks.length }})
            </v-tab>
            <v-tab-item>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-row v-if="ongoingJobs.length">
                      <v-col lg="3" v-for="job in ongoingJobs">
                        <job-item :job="job"></job-item>
                      </v-col>
                    </v-row>
                    <v-card flat color="transparent" v-else>
                      <v-card-text>
                        <v-alert type="info" outlined>
                          There are no ongoing jobs
                        </v-alert>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-row v-if="ongoingTasks.length">
                      <v-col lg="3" v-for="job in ongoingTasks">
                        <job-item :job="job"></job-item>
                      </v-col>
                    </v-row>
                    <v-card flat color="transparent" v-else>
                      <v-card-text>
                        <v-alert type="info" outlined>
                          There are no ongoing jobs at the moment, you need to start a job in order to
                          appear here.
                        </v-alert>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-tab-item>
          </v-tabs>

          <v-card-title> Idle ({{ idleJobs.length }})</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-row v-if="idleJobs.length">
                  <v-col lg="3" v-for="job in idleJobs">
                    <job-item :job="job"></job-item>
                  </v-col>
                </v-row>
                <v-card v-else flat color="transparent">
                  <v-card-text>
                    <v-alert type="info" outlined>
                      There are no idle job or task at the moment
                    </v-alert>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card flat class="mt-5">
          <v-card-title> Past</v-card-title>

          <v-tabs>
            <v-tab>
              Jobs ({{ pastJobs.length }})
            </v-tab>
            <v-tab>
              Tasks ({{ pastTasks.length }})
            </v-tab>
            <v-tab-item>

              <v-card-text v-if="pastJobs.length">
                <v-row>
                  <v-col lg="3" v-for="job in pastJobs">
                    <job-item :job="job"></job-item>
                  </v-col>
                </v-row>

              </v-card-text>
              <v-card-text v-else>
                <v-alert type="info" outlined>
                  There are no past jobs at the moment
                </v-alert>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>

              <v-card-text v-if="pastTasks.length">
                <v-row>
                  <v-col lg="3" v-for="job in pastTasks">
                    <job-item :job="job"></job-item>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-else>
                <v-alert type="info" outlined>
                  There are no past tasks at the moment
                </v-alert>
              </v-card-text>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card flat v-if="pastJobs.length">
          <v-card-text>
            <p>Earnings per month</p>
            <span class="text-md-h3">{{ statsOfMonths[monthNow] ? statsOfMonths[monthNow].totalPrice : 0 }} € </span>
          </v-card-text>
          <earning-per-month :minus="-3" :stats-per-month="statsOfMonths"></earning-per-month>

        </v-card>
        <v-card flat v-if="ongoingJobs.length">
          <v-card-text>
            <p>Total expected earnings for ongoing jobs </p>
            <span class="text-md-h3">{{ getEarnings }} € </span>
          </v-card-text>
        </v-card>
        <v-card flat class="mt-4" v-if="ongoingJobs.length">
          <v-card-text>
            <p> Avg Value </p>
            <span class="text-md-h3">{{ (getEarnings / getTotalHours) |fixed(2) }} € /hr </span>
          </v-card-text>
        </v-card>
        <v-card flat class="mt-4" v-if="ongoingJobs.length">
          <v-card-text>
            <p>Total Hours </p>
            <span class="text-md-h3">{{ getTotalHours }} hr </span>
          </v-card-text>
        </v-card>

        <v-card flat class="mt-4" v-if="ongoingJobs.length">
          <v-card-text>
            <p>Hours Spent </p>
            <span class="text-md-h3">{{ getTotalHoursSpent }} hr </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import NewJob from "@/views/Jobs/NewJob";
import JobItem from "./components/JobItem"
import moment from 'moment'
import EarningPerMonth from "../../components/Statistics/EarningPerMonth"
import JobExpandable from "./components/JobExpandable"

export default {
  name: "Jobs",
  data: () => ({
    monthNow: moment().format('YYYY-MM'),
    swiperOptions: {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
    },
    swiperOptions2: {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
    }
  }),
  components: {
    EarningPerMonth,
    JobItem,
    JobExpandable,
  },


  computed: {
    getEarnings() {
      return this.ongoingJobs.reduce((acc, b) => {
        return acc + b.price
      }, 0);
    },
    getTotalHours() {
      return this.ongoingJobs.reduce((acc, b) => {
        return acc + b.getJobHours()
      }, 0);
    },
    getTotalHoursSpent() {
      return this.ongoingJobs.reduce((acc, b) => {
        return acc + b.getHoursSpent()
      }, 0);
    },
    ...mapGetters('jobs', [
      'ongoingJobs',
      'pastJobs',
      'pastTasks',
      'scheduledJobs',
      'idleJobs',
      'ongoingTasks',
      'statsOfMonths'
    ])
  },
  methods: {

    ...mapActions('jobs', [
      "getJobs",
    ]),
  },

  created() {
    this.getJobs();
  }
}
</script>

<style lang="scss" scoped>


</style>
