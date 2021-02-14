<template>
    <v-list-item :style="'border-left:'+entry.job.color+' solid 5px'">
        <v-list-item-action>
            <v-checkbox hide-details v-model="entry.done" @change="updateScheduleItem(entry)"/>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title> {{entry.job.name}}</v-list-item-title>
            <v-list-item-subtitle>{{entry.jobStage.stage.name}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text> {{entry.hours}} hour(s)</v-list-item-action-text>
            <v-icon
                    color="grey lighten-1"
            >
                mdi-clock
            </v-icon>
        </v-list-item-action>
        <v-list-item-avatar v-if="entry.job.image">
            <v-img
                    :style="'border: 2px solid '+entry.job.color"
                    :gradient="'to bottom, rgba(0,0,0,.0),'+entry.job.getFormatedColor(0.3)"
                    :src="entry.job.image"/>
        </v-list-item-avatar>
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
