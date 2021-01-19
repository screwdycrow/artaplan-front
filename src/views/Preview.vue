<template>
    <div>
        <v-row>
            <v-col sm="12" lg="6">
                <new-job/>
            </v-col>
            <v-col sm="12" lg="3">
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import ScheduleEntry from "@/classes/ScheduleEntry";
    import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import NewJob from "@/views/Jobs/NewJob";

    export default {
        name: "Preview",
        data: () => ({
        }),
        components: {NewJob},
    }
</script>

<style scoped>

</style>
