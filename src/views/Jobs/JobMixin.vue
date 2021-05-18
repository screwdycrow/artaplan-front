<script>
    import {mapActions, mapGetters, mapMutations} from "vuex"

    export default {
        name: "JobMixin",
        methods: {
            cancel(){
                this.job.markJobAsCancelled();
                this.updateJob(this.job);
            },
            start() {
                this.job.markJobAsOngoing();
                this.updateJob(this.job);
            },
            finish() {
                this.job.markJobAsFinished();
                this.updateJob(this.job);
            },
            reopen(){
                this.job.reopen();
                this.updateJob(this.job);
            },
            update(){
              this.updateJob(this.job);
            },
            ...mapActions('jobs', [
                "updateJob",
                "getJob"
            ]),
            ...mapMutations('jobs', [
                "setActiveJob",
            ]),
        },


        computed: {
            ...mapGetters('jobs',[
                'job'
            ])
        }
    }
</script>

<style scoped>

</style>