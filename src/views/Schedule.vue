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
                <v-btn @click="changeDays(-7)" rounded>
                    <v-icon> mdi-chevron-up</v-icon>
                </v-btn>
                <v-row dense v-if="ongoingJobs.length>0">
                    <v-col lg="2" v-for="day in days">
                        <day-entries  :day="day"></day-entries>
                    </v-col>
                </v-row>
                <v-btn @click="changeDays(+7)" rounded>
                    <v-icon> mdi-chevron-down</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
    import ScheduleEntry from "@/classes/ScheduleEntry";
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import JobPreviewList from "@/components/Jobs/JobPreviewList";
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import jobs from "@/api/jobs";
    import moment from "moment"
    import DayEntries from "../components/Schedule/DayEntries"

    export default {
        name: "Schedule",
        components: {DayEntries, JobPreviewList, JobExpandable, ScheduleEntryItem},

        data: () => ({
            minus: -1,
            plus: 10,
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
                    "days"
                ]),

            ...mapGetters(
                'jobs',
                [
                    "ongoingJobs"
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

</style>
