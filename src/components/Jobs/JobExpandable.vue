<template>
    <v-expansion-panel>
        <v-menu
                v-model="showMenuJob"
                :position-x="x"
                :position-y="y"
                absolute
                offset-y
        >
            <v-list dense v-if="job">
                <v-list-item dense @click="showJob()">
                    <v-list-item-title> Open Job </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-expansion-panel-header :style="'border-left:'+job.color+' solid 5px'"
                                  hide-actions
                                  @contextmenu="show2"
                                  style="padding:0 10px 0 0">
            <v-list-item>
                <v-list-item-avatar :color="job.color">
                    <v-img :style="'border: 2px solid '+job.color"
                           :gradient="'to bottom, rgba(0,0,0,.0),'+job.getFormatedColor(0.3)"
                           v-if="job.image" :src="job.image" :lazy-src="require('../../assets/placeholder.png')"/>
                </v-list-item-avatar>
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
                <job-stage-item
                        @contextmenu="show($event,js)"
                        v-for="js in job.jobStages"
                        :job-stage="js"
                        :color="job.color"
                />
            </v-list>

            <v-menu
                    v-model="showMenu"
                    :position-x="x"
                    :position-y="y"
                    absolute
                    offset-y
            >
                <v-list dense v-if="activeJobStage">
                    <v-list-item dense @click="addHour()">
                        <v-list-item-title>add Hour</v-list-item-title>
                    </v-list-item>
                    <v-list-item dense @click="removeHour()"
                                 v-if="activeJobStage.jobHours !== activeJobStage.workHours">
                        <v-list-item-title>remove Hour</v-list-item-title>
                    </v-list-item>
                    <v-list-item dense @click="addDeadline()">
                        <v-list-item-title>add Deadline</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-expansion-panel-content>
        <v-progress-linear :color="job.color" style="position: absolute; bottom:0;"
                           :value="job.getCompletionPercentage()"/>
    </v-expansion-panel>
</template>

<script>
    import Job from "@/classes/Job";
    import JobStageItem from "@/components/Stages/JobStageItem";

    export default {
        name: "JobExpandable",
        components: {JobStageItem},
        data: () => ({
            showMenu: false,
            showMenuJob: false,
            activeJobStage: null,
            x: 0,
            y: 0
        }),
        props: {
            job: Job,
            detailed: Boolean
        },
        methods: {
            addHour() {
                this.activeJobStage.jobHours++;
            },
            showJob(){

            },
            show2(e){
                e.preventDefault();
                this.showMenuJob = false;
                this.x = e.clientX;
                this.y = e.clientY;
                this.$nextTick(() => {
                    this.showMenuJob= true;
                })
            },
            show(e, js) {
                e.preventDefault();
                this.activeJobStage = js;
                this.showMenu = false;
                this.x = e.clientX;
                this.y = e.clientY;
                this.$nextTick(() => {
                    this.showMenu = true;
                })
            },
            removeHour() {
                this.activeJobStage.jobHours--;
            }
        }
    }
</script>

<style scoped>
    .done {
        background: rgba(216, 216, 216, 0.33);

    }
</style>
