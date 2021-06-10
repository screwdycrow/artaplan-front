<template>
  <v-card class="fill-height" :to="'/jobs/'+job.jobId">
    <v-toolbar dense flat="" :color="job.getFormatedColor(0.4)">
      <v-toolbar-title>
        <strong>{{ job.name }} </strong>
      </v-toolbar-title>
    </v-toolbar>
    <v-list dense>
      <v-list-item v-if="!dense">
        <v-list-item-action>
          <v-icon> mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          {{ job.customer.name }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="!dense">
        <v-list-item-action>
          <v-icon> mdi-brush</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          {{ job.slot.name }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="job.status === 'ongoing' || job.status === 'idle'">
        <v-list-item-action>
          <v-icon>mdi-flag-checkered</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title  v-if="job.deadline">
            {{ job.deadline | formatDate}}
          </v-list-item-title>
          <v-list-item-title  v-else>
             No deadline
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="job.deadline" style="color:#ff1b0e">
         in {{job.getFormattedDeadline('days')}} days
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <job-tags :job="job"></job-tags>
        </v-list-item-content>
        <v-list-item-action>
          <span class="display-1" :style="'color:'+job.getJobColor()"> {{ job.price | fixed }} €  </span>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-progress-linear :color="job.color" height="10" style="position: absolute; bottom:0;"
                       :value="job.getCompletionPercentage()"/>
  </v-card>
</template>

<script>
import Job from "../../../classes/Job"
import JobTags from "./JobTags"

export default {
  name: "JobItem",
  components: {JobTags},
  props: {
    job: Job,

    dense: {type: Boolean, default: null, required: false}
  }
}
</script>

<style scoped>

</style>
