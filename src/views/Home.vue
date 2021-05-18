<template>
    <div class="home" id="content">
        <portal to="toolbar-title"> Dashboard</portal>
        <portal to="toolbar-actions">
        </portal>
        <v-row>
            <v-col sm="12" lg="4">
                <v-card class="fill-height" v-if="schedule">
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Today's schedule</strong>
                        </v-toolbar-title>
                        <v-spacer/>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-list >
                        <schedule-entry-item v-for="entry in todaySchedule" :entry="entry"/>
                    </v-list>
                </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-toolbar flat color="transparent">
                  <v-toolbar-title>
                    <strong class="text--primary"> Ongoing Jobs ({{ ongoingJobs.length }}) </strong>
                  </v-toolbar-title>
                  <v-toolbar-items>
                  </v-toolbar-items>
                  <v-spacer/>
                </v-toolbar>
                <v-card-text>

                <v-row>
                  <v-col>
                    <v-row v-if="ongoingJobs.length">
                      <v-col lg="4" v-for="job in ongoingJobs">
                        <job-item :job="job"></job-item>
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

            </v-col>
            <v-col>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import ScheduleItem from "../components/Schedule/ScheduleEntryItem"
    import ScheduleEntry from "@/classes/ScheduleEntry";
    import {mapActions, mapGetters, mapState} from "vuex";
    import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
    import JobPreviewList from "@/components/Jobs/JobPreviewList";
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import WorkLoadChart from "@/components/Schedule/WorkloadChart";
    import jobs from "@/api/jobs";
    import JobItem from "../components/Jobs/JobItem"
    import moment from "moment"

    export default {
        name: 'Home',
        data: () => ({
            todaySchedule: [],
        }),
        components: {
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
                'workload'
            ]),
            ...mapGetters('jobs', [
                'ongoingJobs'
            ])
        },
        created() {
            this.getJobs().then(r => {
                this.getSchedule().then(() => {
                   this.todaySchedule =  this.entriesOfDay(moment().format("YYYY-MM-DD"))
                })
            });
        },
        methods: {
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
