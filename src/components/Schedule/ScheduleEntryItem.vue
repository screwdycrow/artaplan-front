<template>
    <v-list-item :style="'border-left:'+entry.jobStage.job.color+' solid 5px'">
        <v-list-item-content>
            <v-list-item-title> {{entry.jobStage.job.name}}</v-list-item-title>
            <v-list-item-subtitle>{{entry.jobStage.stage.name}}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapActions} = createNamespacedHelpers('schedule');
    import ScheduleEntry from "@/classes/ScheduleEntry";
    export default {
        name: "scheduleEntryItem",
        props:{entry:ScheduleEntry},
        methods:{
            ...mapActions([
                "updateScheduleItem"
            ])
        }
    }
</script>

<style scoped>

</style>
