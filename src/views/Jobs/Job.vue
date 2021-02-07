<template>

    <div>
        <portal to="toolbar-title">
        {{job.name}}
    </portal>
        <v-row>
            <v-col lg="3">

                <v-card >
                    <v-card-actions color="transparent" flat>
                        <v-btn v-if="job.status === 'idle' || job.status === 'scheduled' " color="secondary">Start Job </v-btn>
                        <v-btn v-if="job.status !== 'finished' || job.status !== 'ongoing' ">Cancel Job </v-btn>
                        <v-btn color="secondary" v-if="job.status === 'ongoing'">Finish</v-btn>
                    </v-card-actions>
                    <v-expansion-panels mandatory>
                        <job-expandable :job="job"></job-expandable>

                    </v-expansion-panels>
                </v-card>
            </v-col>
            <v-col lg="9">
                <v-tabs>
                    <v-tab>
                        Details
                    </v-tab>
                    <v-tab>
                        Schedule
                    </v-tab>
                    <v-tab>
                        References
                    </v-tab>
                    <v-tab-item>
                        <v-card >
                            <v-card-text>
                                <v-form>
                                    <strong> Details </strong>
                                    <v-row>
                                        <v-col lg="10">
                                            <v-text-field required filled type="text"
                                                          label="Job Name (*)"
                                                          v-model="job.name"/>
                                        </v-col>
                                        <v-col lg="2">
                                            <v-text-field required filled type="number"
                                                          label="Job Price (*) " v-model.number="job.price"
                                                          append-icon="mdi-cash"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-textarea dense filled label="Job Description"
                                                        v-model="job.description"/>
                                        </v-col>

                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>

                    </v-tab-item>
                    <v-tab-item>

                    </v-tab-item>
                </v-tabs>

            </v-col>
        </v-row>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex"
    import JobExpandable from "../../components/Jobs/JobExpandable"

    export default {
        name: "Job",
        components: {JobExpandable},
        watch: {
            $route(to, from) {
                this.getJob(this.$route.params.id);
            },
        },
        created() {
            this.getJob(this.$route.params.id)
        },
        computed: {
            ...mapGetters('jobs', [
                'job',
            ])
        },
        methods: {
            ...mapActions('jobs', [
                "getJob",
                "updateJob"
            ]),
            ...mapMutations('jobs', [])
        }
    }
</script>

<style scoped>

</style>