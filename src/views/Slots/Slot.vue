<template>
    <v-card flat>
        <v-toolbar flat color="faded">
            <v-toolbar-title><h2 class="headline"> {{slot.name}}</h2></v-toolbar-title>
        </v-toolbar>
        <v-tabs show-arrows="" background-color="faded">
            <v-tab>Details</v-tab>
            <v-tab>Stages</v-tab>
            <v-tab>Past Jobs</v-tab>
            <v-tab-item>
                <v-card-text>
                    <v-text-field outlined v-model="slot.name" label="Name"/>
                    <v-text-field outlined v-model.number="slot.price" label="Price" append-icon="mdi-cash"/>
                    <v-textarea outlined v-model="slot.description" label="Description"/>
                    <v-card-actions>
                        <v-btn outlined color="success" @click="putSlot(slot)"> Update Details</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>
                    <v-list>
                        <v-list-item ripple @click="toggleStageDefault(stage)" link v-for="stage in slot.stages"
                                     :key="stage.stageId">
                            <v-list-item-content>
                                <v-list-item-title> {{stage.name}}</v-list-item-title>
                                {{stage.description}}
                            </v-list-item-content>
                            <v-list-item-action class="text-center">
                                <v-list-item-action-text>
                                    Estimated
                                </v-list-item-action-text>
                                {{stage.estimatedHours}} h
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-row  v-if="jobs.length">
                            <v-col lg="3"  v-for="job in jobs">
                                <job-item :job="job"></job-item>
                            </v-col>
                        </v-row>
                        <v-card v-else flat color="transparent">
                            <v-card-text>
                                There are no jobs for this slot
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs>

    </v-card>

</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "Slot",
        created() {
            this.getSlot(this.$route.params.id)
        },
        data: () => ({
            activeSlot: {},
            jobs:[],
            stage: {
                name: null,
                description: null,
                estimatedHours: null,
            },
        }),
        watch: {
            $route(to, from) {
                this.getSlot(this.$route.params.id);
                this.jobs = this.jobsOfSlot(this.$route.params.id)
            },
        },
        computed: {
            ...mapGetters('slots', [
                "slot"
            ]),
            ...mapGetters('jobs',[
                'jobsOfSlot'
            ])

        },
        methods: {
            ...mapActions('slots', [
                "getSlot",
                "putSlot"
            ])
        },
        onDragEnd() {
            this.slot.stages.forEach((slot, index) => {
                slot.order = index;
                console.log(this.slot.stages);
            });
        },
        removeStage(index) {
            this.slot.stages.splice(index, 1);
        },
        addStage() {
            this.slot.stages.push(this.stage);
            this.stage = {
                name: null,
                description: null,
                estimatedHours: null,
            }
        }
    }

</script>

<style scoped>

</style>