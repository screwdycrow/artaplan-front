<template>
    <v-list-item
            @contextmenu="$emit('contextmenu',$event)"
            :class="{'done':jobStage.workHours === jobStage.jobHours}"
            @click=""
            class="pa-1 pt-0 pb-0"  dense
            style="border-top: solid rgba(140,140,140,0.28) 1px">
        <v-list-item-action>
            <v-icon>mdi-drag</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-row dense>
                <v-col lg="8">
                    <v-list-item-title>
                        {{jobStage.stage.name}}
                    </v-list-item-title>
                </v-col>
                <v-col lg="4">
                    <v-progress-linear dark :color="jobStage.jobHours === jobStage.workHours?'grey':color" style="font-size: 0.7em"
                                       :value="jobStage.getCompletionPercentage()" height="20">
                        {{jobStage.workHours}} / {{jobStage.jobHours}} hours
                    </v-progress-linear>
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

</style>
