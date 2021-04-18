<template>
    <v-list-item class="elevation-2 entry" :class="{'done':entry.isDone}"
                 :style="'border-left:'+entry.jobStage.job.color+' solid 5px;background-color:'+entry.jobStage.job.getFormatedColor(0.5)">
        <v-list-item-content>
            <v-list-item-title> {{entry.jobStage.stage.name}}</v-list-item-title>
            <v-list-item-subtitle> {{entry.jobStage.job.name}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="actions">
            <v-btn small icon @click="remove()">
                <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <v-btn small icon @click="done()">
                <v-icon small>mdi-check</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import {createNamespacedHelpers, mapMutations} from "vuex";

    const {mapActions} = createNamespacedHelpers('schedule');
    import ScheduleEntry from "@/classes/ScheduleEntry";

    export default {
        name: "scheduleEntryItem",
        props: {entry: ScheduleEntry},
        methods: {
            done() {
                this.doScheduleEntry(this.entry).then(() => {
                    this.entry.isDone = !this.entry.isDone;
                    this.$emit('onDone', this.entry)
                    this.updateJobStageWorkHours({
                        workHours: this.entry.isDone ? +1 : -1,
                        jobId: this.entry.jobStage.job.jobId,
                        jobStageId: this.entry.jobStage.jobStageId
                    })
                })
            },
            remove() {
                this.deleteScheduleEntry(this.entry).then(() => {
                    this.$emit('onDelete', this.entry)
                    this.updateJobStageWorkHours({
                        workHours: -1,
                        jobId: this.entry.jobStage.job.jobId,
                        jobStageId: this.entry.jobStage.jobStageId
                    })
                });
            },
            ...mapMutations('jobs', [
                "updateJobStageWorkHours"
            ]),
            ...mapActions([
                "deleteScheduleEntry",
                "doScheduleEntry"
            ])
        }
    }
</script>

<style scoped>

    .done {
        opacity: 0.4;
    }

    .entry:hover > .actions {
        display: block;
    }

    .entry .actions {
        display: none;
    }

</style>
