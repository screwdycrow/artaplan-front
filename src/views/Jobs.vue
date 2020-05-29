<template>
    <div>
        <portal to="toolbar-title">
            Jobs
        </portal>
        <portal to="toolbar-items">
        </portal>
        <portal to="toolbar-actions">
            <v-btn color="primary" @click="newJob()">
                <v-icon> mdi-plus</v-icon>
                New
            </v-btn>
        </portal>
        <v-row>
            <v-col sm="12" lg="4">
                <v-card class="mb-4">
                    <v-toolbar color="transparent" flat>
                        <v-toolbar-title>
                            <strong class="text--primary"> Started jobs ({{ongoingJobs.length}}) </strong>
                        </v-toolbar-title>
                        <v-toolbar-items>
                        </v-toolbar-items>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-expansion-panels>
                            <job-expandable detailed v-for=" job in ongoingJobs" :job="job"/>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Scheduled (0) </strong>
                        </v-toolbar-title>
                        <v-toolbar-items>
                        </v-toolbar-items>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-expansion-panels>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Idle (0) </strong>
                        </v-toolbar-title>
                        <v-toolbar-items>
                        </v-toolbar-items>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>

                    </v-card-text>
                </v-card>
            </v-col>
            <v-col sm="12" lg="8">
                <v-card>
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Past Jobs </strong>
                        </v-toolbar-title>
                        <v-toolbar-items>
                        </v-toolbar-items>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import NewJob from "@/components/Jobs/NewJob";

    export default {
        name: "Jobs",
        components: {JobExpandable},
        computed: {
            ...mapGetters('jobs', [
                'ongoingJobs',
                'pastJobs'
            ])
        },
        methods: {
            ...mapActions('jobs', [
                "getOngoingJobs",
            ]),
            newJob() {
                this.$modal.show(NewJob,{},{height: 'auto'},
                )
            },
        },

        created() {
            this.getOngoingJobs();
        }
    }
</script>

<style scoped>

</style>
