<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div>
        <portal to="toolbar-title">
            {{job.name}}
        </portal>
        <portal to="toolbar-actions">
            <v-btn class="mr-3" v-if="job.status === 'idle' || job.status === 'scheduled' " color="primary">Start Job
            </v-btn>
            <v-btn v-if="job.status !== 'finished' || job.status !== 'ongoing' ">Cancel Job</v-btn>
            <v-btn color="secondary" v-if="job.status === 'ongoing'">Finish</v-btn>
        </portal>

        <v-row>
            <v-col lg="3">
                <v-toolbar flat color="transparent">
                    <v-toolbar-title>
                        <h3>Details</h3>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col lg="10">
                                <v-text-field hide-details required outlined type="text"
                                              label="Job Name (*)"
                                              v-model="job.name"/>
                            </v-col>
                            <v-col lg="2">
                                <v-dialog
                                        ref="menu2"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon large outlined="" v-on="on" rounded :color="job.color">
                                            <v-icon>mdi-palette</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-color-picker v-model="job.color"></v-color-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg=6>
                                <v-text-field
                                        outlined
                                        hide-details
                                        required type="number"
                                        label="Job Price (*) " v-model.number="job.price"
                                        append-icon="mdi-cash"/>

                            </v-col>
                            <v-col lg="6">
                                <v-menu
                                        ref="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                outlined
                                                readonly
                                                hide-details
                                                v-model="job.deadline"
                                                label="Deadline"
                                                persistent-hint
                                                append-icon="mdi-calendar"
                                                v-bind="attrs"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            @input="job.setDeadline"
                                            no-title
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-toolbar flat color="transparent">
                    <v-toolbar-title>
                        <h3>Stages</h3>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-expansion-panels mandatory>
                        <job-expandable :job="job"></job-expandable>

                    </v-expansion-panels>
                </v-card>
            </v-col>
            <v-col lg="9">
                <v-toolbar flat color="transparent">
                    <v-toolbar-title>
                        <h3>Description</h3>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-textarea rows="6" hide-details dense outlined label="Job Description"
                                    v-model="job.description"/>

                    </v-card-text>
                </v-card>
                <v-toolbar flat color="transparent">
                    <v-toolbar-title>
                        <h3>References</h3>
                    </v-toolbar-title>
                </v-toolbar>
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