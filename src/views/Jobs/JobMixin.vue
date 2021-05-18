<script>
import {mapActions, mapGetters, mapMutations} from "vuex"

export default {
  name: "JobMixin",
  methods: {
    cancel() {
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
    reopen() {
      this.job.reopen();
      this.updateJob(this.job);
    },
    update() {
      this.updateJob(this.job);
    },
    deleteJ() {
      if (confirm("are you sure you want to completely delete this job")) {
        this.deleteJob(this.job).then(resp => {
          this.$router.push('/jobs')
        });
      }

    },
    ...mapActions('jobs', [
      "updateJob",
      "getJob",
      "deleteJob"
    ]),
    ...mapMutations('jobs', [
      "setActiveJob",
    ]),
  },


  computed: {
    ...mapGetters('jobs', [
      'job'
    ])
  }
}
</script>

<style scoped>

</style>
