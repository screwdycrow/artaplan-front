<template>
    <div>
        <portal to="toolbar-title">
            Schedule
        </portal>
        <portal to="toolbar-items">
        </portal>
        <portal to="toolbar-actions">
            <v-btn color="primary">
                Auto Assign
            </v-btn>
            <v-btn icon>
                <v-icon> mdi-cog</v-icon>
            </v-btn>
        </portal>
        <v-row>
            <v-col lg="3">
                <v-toolbar dense flat> Ongoing Jobs</v-toolbar>
                <job-preview-list :jobs="ongoingJobs"/>
            </v-col>
            <v-col lg="9">
                <v-row dense v-if="ongoingJobs.length>0">
                    <v-col lg="4" v-for="date in dates">
                        <v-card min-height="270" color="transparent" flat outlined>
                            <v-toolbar dense>
                                {{date}}
                            </v-toolbar>
                            <v-card-text>
                                <v-list class="pa-0" dense>
                                    <schedule-entry-item :item="scheduleEntry"/>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </div>
</template>

<script>
    import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
    import ScheduleEntry from "@/classes/ScheduleEntry";
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import JobPreviewList from "@/components/Jobs/JobPreviewList";
    import {mapActions, mapGetters} from 'vuex';
    import jobs from "@/api/jobs";

    export default {
        name: "Schedule",
        components: {JobPreviewList, JobExpandable, ScheduleEntryItem},

        data: () => ({

            scheduleEntry: null,
            dates: [
                '12/12/12',
                '12/12/12',
                '12/12/12',
                '12/12/12',
                '12/12/12',
                '12/12/12',
                '12/12/12',
                '12/12/12',
                '12/12/12'
            ]
        }),
        created() {
            this.getJobs().then(r => {
                this.getSchedule()
            });
        },
        computed: {
            ...mapGetters(
                'schedule',
                [
                    "schedule"
                ]),
            ...mapGetters(
                'jobs',
                [
                    "ongoingJobs"
                ])
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
                    "getJobs",

                ]
            ),
        }
    }
</script>

<style scoped>

</style>
