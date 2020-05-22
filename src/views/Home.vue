<template>
    <div class="home" id="content">
        <portal to="toolbar-title"> Dashboard</portal>
        <portal to="toolbar-actions">
        </portal>

        <v-row>
            <v-col sm="12" lg="3" class="mb-5">
                <v-card color="transparent" v-if="ongoingJobs">
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
                        <schedule-entry-item v-for="entry in scheduleToday"  :item="entry" />
                    </v-list>
                </v-card>
            </v-col>
            <v-col sm="12" lg="9">
                <v-card color="transparent">
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Workload </strong>
                        </v-toolbar-title>
                        <v-spacer/>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-list two-line>
                        <job-stage-item/>
                        <job-stage-item/>
                        <job-stage-item/>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-toolbar flat color="transparent">
            <v-toolbar-title>
                <strong class="text--primary"> Ongoing Jobs ({{ongoingJobs.length}}) </strong>
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
    import {mapActions, mapGetters} from "vuex";
    import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
    import JobPreviewList from "@/components/Jobs/JobPreviewList";
    import JobExpandable from "@/components/Jobs/JobExpandable";

    export default {
        name: 'Home',
        data: () => ({}),
        components: {
            JobExpandable,
            JobPreviewList,
            ScheduleEntryItem,
            ScheduleItem,
            JobCard,
            HelloWorld
        },
        computed: {
            ...mapGetters('schedule', [
                'scheduleToday'
            ]),
            ...mapGetters('jobs', [
                'ongoingJobs'
            ])
        },
        created() {
            this.getOngoingJobs().then(r => {
                this.getSchedule()
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
                    "getOngoingJobs"
                ]
            ),
        }
    }
</script>
