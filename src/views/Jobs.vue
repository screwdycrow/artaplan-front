<template>
    <div>
        <v-toolbar extended color="transparent" flat> <h1>Manage Jobs</h1> </v-toolbar>
        <v-row>
            <v-col sm="12" lg="3">
                <job-list/>
            </v-col>
            <v-col sm="12" lg="9">
                <job-editor job-id="1"/>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import JobList from "@/components/Jobs/JobList";
    import JobEditor from "@/components/Jobs/JobEditor";
    export default {
        name: "Jobs",
        components: {JobEditor, JobList}
    }
</script>

<style scoped>

</style>
