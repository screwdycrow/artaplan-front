<template>
    <v-expansion-panel class="job-expandable"
                       :style="'border-left:'+job.color+' solid 5px'">
        <v-menu
                v-model="showMenuJob"
                :position-x="x"
                :position-y="y"
                absolute
                offset-y
        >
            <v-list dense v-if="job">
                <v-list-item dense @click="showJob()">
                    <v-list-item-title> Open Job</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-expansion-panel-header
                                  hide-actions
                                  @contextmenu="show2"
                                  style="padding:0 10px 0 0">
            <v-list-item :style="'background-color:'+job.getFormatedColor(0.5)">
                <v-list-item-content>
                    <v-list-item-title>
                        {{job.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{job.customer.name}}
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="detailed && job.toStartAt && !job.startedAt" class="align-center">
                    <v-list-item-action-text>Scheduled:</v-list-item-action-text>
                    {{moment | formatDate}}
                </v-list-item-action>
                <v-list-item-action v-if="detailed && job.startedAt" class="align-center">
                    <v-list-item-action-text>Started:</v-list-item-action-text>
                    {{job.startedAt | formatDate}}
                </v-list-item-action>
                <template v-if="job.deadline">
                    <v-list-item-action class="align-center">
                        <v-list-item-action-text>Deadline in</v-list-item-action-text>
                        {{job.getFormattedDeadline('days')}} days
                    </v-list-item-action>
                </template>

            </v-list-item>

        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-list dense>
                <drag v-for="js in job.jobStages" :key="js.tempId" :data="js" @cut="()=>{}"
                >
                    <job-stage-item
                            :job-stage="js"
                            :color="job.color"
                    />
                </drag>

            </v-list>

        </v-expansion-panel-content>
        <v-progress-linear
                           :color="job.color"
                           style="position: absolute; bottom:0;"
                           :value="job.getCompletionPercentage()"/>
    </v-expansion-panel>
</template>

<script>
    import Job from "@/classes/Job";
    import JobStageItem from "@/components/Stages/JobStageItem";
    import {Drag} from "vue-easy-dnd"

    export default {
        name: "JobExpandable",
        components: {JobStageItem, Drag},
        data: () => ({
            showMenuJob: false,
            x: 0,
            y: 0
        }),
        props: {
            job: Job,
            detailed: Boolean
        },
        methods: {

            showJob() {
                this.$router.push('/jobs/'+this.job.jobId)
            },
            show2(e) {
                e.preventDefault();
                this.showMenuJob = false;
                this.x = e.clientX;
                this.y = e.clientY;
                this.$nextTick(() => {
                    this.showMenuJob = true;
                })
            },
        }
    }
</script>

<style scoped>

</style>
