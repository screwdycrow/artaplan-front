<template>
    <v-chip-group dense ><v-chip small outlined :color="colors[job.status]"> {{job.status}}</v-chip> </v-chip-group>
</template>

<script>
    import Job from "../../classes/Job"

    export default {
        name: "JobTags",
        data:()=>({
            colors:{}
        }),
        created(){
          this.colors[Job.status.IDLE] = 'orange'
          this.colors[Job.status.FINISHED] = 'green'
          this.colors[Job.status.ONGOING] = 'blue'
          this.colors[Job.status.CANCELLED] = 'red'
          this.colors[Job.status.SCHEDULED] = 'lime'
        },
        props: {
            job:Job
        }
    }
</script>

<style scoped>

</style>