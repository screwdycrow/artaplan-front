<template>
    <v-list-item
            @contextmenu="$emit('contextmenu',$event)"
            @click=""
            class="pa-1 pt-0 pb-0 jobStage"  dense
            style="border-top: solid rgba(140,140,140,0.28) 1px">
        <v-list-item-action class="actions">
            <v-icon>mdi-drag</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-row dense>
                <v-col lg="9">
                    <v-list-item-title>
                        {{jobStage.stage.name}}
                    </v-list-item-title>
                </v-col>
                <v-col lg="3">
                    <span
                                       :class="{
                                       'overworked': (jobStage.workHours > jobStage.jobHours),
                                       'done': (jobStage.workHours === jobStage.jobHours)
                                       }"
                                       :color="jobStage.jobHours === jobStage.workHours?'grey':color"
                                       style="font-size: 0.7em"
                                       height="20">
                        {{jobStage.workHours}} / {{jobStage.jobHours}} hr
                    </span>
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    import JobStage from "@/classes/JobStage";

    export default {
        name: "JobStageItem",
        props:{
            jobStage:JobStage,
            color:String,
        }
    }
</script>

<style scoped>

    .overworked{
        color: red;
    }
    .done{
        color: green;
    }
    .jobStage:hover > .actions{
        display: block;
    }
    .jobStage .actions{
        display: none;
    }

</style>
