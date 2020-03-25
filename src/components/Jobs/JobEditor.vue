<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title><h3 class="headline"> Active Job </h3></v-toolbar-title>
        </v-toolbar>
    </v-card>


</template>

<script>
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('jobs');
    export default {
        name: "jobEditor",
        data() {
            return {}
        },

        computed: {
            ...mapGetters([
                "job",
            ]),
            heading() {
                return this.isNew ? "New Job" : this.job.name;
            }
        },
        watch: {
            jobId(newValue) {
                this.getJob(newValue)
            }
        },
        created() {
            this.init(this.jobId)
        },
        methods: {
            init(jobId) {
                this.getJob(jobId)
            },
            ...mapActions([
                "getJob"
            ])

        },
        props: {jobId: Number, isNew: Boolean}
    }
</script>

<style scoped>

</style>
