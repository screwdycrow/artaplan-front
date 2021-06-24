<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>
    <portal to="toolbar-title">
      {{ job.name }}
    </portal>
    <portal to="toolbar-actions">
      <v-btn class="mr-3" @click="start()" v-if="job.status === 'idle' || job.status === 'scheduled' "
             color="primary">
        Start Job
      </v-btn>
      <v-btn class="mr-3"  color="green" @click="update()" dark>
        Update
      </v-btn>
      <v-btn class="mr-3" outlined @click="finish()" color="secondary" v-if="job.status === 'ongoing'">
        Finish
      </v-btn>
      <v-btn class="mr-3" outlined @click="reopen()" color="secondary"
             v-if="job.status !== 'ongoing'" >
        Reopen
      </v-btn>
      <v-btn class="mr-3" outlined @click="cancel()" v-if="job.status !== 'finished' || job.status !== 'ongoing' ">Cancel</v-btn>
      <v-btn class="mr-3" outlined color="red" @click="deleteJ()">Delete</v-btn>
    </portal>
    <v-row v-if="job">
      <v-col lg="2">
        <v-list min-height="80vh" class="fill-height">
          <v-list-item :color="job.color" exact :to="'/jobs/'+job.jobId+'/'">
            <v-list-item-icon>
              <v-icon>mdi-eye</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Overview
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :color="job.color" :to="'/jobs/'+job.jobId+'/details'">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Edit Details
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :color="job.color" :to="'/jobs/'+job.jobId+'/references'">
            <v-list-item-icon>
              <v-icon>mdi-pin</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                References
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :color="job.color" :to="'/jobs/'+job.jobId+'/files'">
            <v-list-item-icon>
              <v-icon>mdi-folder-image</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Files
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col lg="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import JobExpandable from "./components/JobExpandable"
import JobMixin from './JobMixin'

export default {
  name: 'Job',
  mixins: [JobMixin],
  created() {
    this.getJob(this.$route.params.id)
  },


}
</script>

<style scoped>

</style>
