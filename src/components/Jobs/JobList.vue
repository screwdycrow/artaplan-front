<template>
    <v-card flat color="">
        <v-toolbar flat>
            <v-toolbar-title>
                <h3 class="headline"> Your Jobs</h3>
            </v-toolbar-title>
        </v-toolbar>
        <v-list color="transparent">
            <v-list-item active-class="active" @click="active=job.jobId" v-model="active===job.jobId"
                         v-for=" job in jobs" :key="job.jobId">
                <v-list-item-icon>
                    <v-icon v-if="active===job.jobId">mdi-chevron-right</v-icon>
                </v-list-item-icon>
                <v-list-item-title @click="editJob(job)"> {{job.name}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('jobs');
    export default {
        name: "jobList",
        data: () => ({
            active: 1
        }),
        computed: {
            ...mapGetters([
                "jobs"
            ])
        },
        created() {
            this.getAllJobs();
        },
        methods: {
            editJob(job) {
                this.$emit("jobClicked", job.jobId);
            },
            ...mapActions([
                "getAllJobs"
            ]),
            ...mapMutations([
                "pushJobToList",
                "removeJobFromList",

            ])
        }

    }

</script>

<style scoped>

</style>
