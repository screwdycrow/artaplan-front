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
                <v-toolbar flat dense>
                    <v-toolbar-title>
                        Ongoing Jobs
                    </v-toolbar-title>
                </v-toolbar>
                <v-card  flat>
                    <job-preview-list :jobs="ongoingJobs"></job-preview-list>
                </v-card>

            </v-col>
            <v-col lg="10">
                <v-card >
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
                        <v-row dense v-if="ongoingJobs.length>0">
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
    .cols-7 {
        width: 14%;
        max-width: 14%;
        flex-basis: 14%;
    }
</style>
