<template>
    <v-list-item :style="'border-left:'+item.job.color+' solid 5px'">
        <v-list-item-action>
            <v-checkbox hide-details v-model="item.done" @change="updateScheduleItem(item)"/>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title> {{item.job.name}} </v-list-item-title>
            <v-list-item-subtitle>{{item.jobStage.stage.name}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text> {{item.hours}} hour(s) </v-list-item-action-text>
            <v-icon
                    color="grey lighten-1"
            >
                mdi-clock
            </v-icon>
        </v-list-item-action>
        <v-list-item-avatar v-if="item.job.image">
            <v-img
                    :style="'border: 2px solid '+item.job.color"
                    :gradient="'to bottom, rgba(0,0,0,.0),'+item.job.getFormatedColor(0.3)"
                    :src="item.job.image"/>
        </v-list-item-avatar>
    </v-list-item>
</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapActions} = createNamespacedHelpers('schedule');
    import ScheduleEntry from "@/classes/ScheduleEntry";
    export default {
        name: "scheduleEntryItem",
        props:{item:ScheduleEntry},
        methods:{
            ...mapActions([
                "updateScheduleItem"
            ])
        }
    }
</script>

<style scoped>

</style>
