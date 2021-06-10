<template>
    <v-chip-group dense >
      <v-chip small outlined color="red" v-if="job.isOverWork()"> Overwork </v-chip>
      <v-chip small outlined :color="colors[job.status]"> {{job.status}}</v-chip>
    </v-chip-group>
</template>

<script>
    import Job from "../../../classes/Job"

    export default {
        name: "JobTags",
        data:()=>({
            colors:{}
        }),
        created(){
          this.colors[Job.STATUS.IDLE] = 'orange'
          this.colors[Job.STATUS.FINISHED] = 'green'
          this.colors[Job.STATUS.ONGOING] = 'blue'
          this.colors[Job.STATUS.CANCELLED] = 'red'
          this.colors[Job.STATUS.SCHEDULED] = 'lime'
        },
        props: {
            job:Job
        }
    }
</script>

<style scoped>

</style>
