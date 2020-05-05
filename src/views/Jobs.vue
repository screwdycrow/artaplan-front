<template>
    <div>
        <portal to="toolbar-title">
            Jobs
        </portal>
        <portal to="toolbar-items">
        </portal>
        <portal to="toolbar-actions">
            <v-btn color="primary"  > <v-icon> mdi-plus</v-icon> New</v-btn>
        </portal>
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
