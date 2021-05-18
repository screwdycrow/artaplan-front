<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div>
        <portal to="toolbar-title">
            {{job.name}}
        </portal>
        <portal to="toolbar-actions">
            <v-btn class="mr-3" @click="start()" v-if="job.status === 'idle' || job.status === 'scheduled' "
                   color="primary">
                Start Job
            </v-btn>
            <v-btn class="mr-3" color="green" @click="update()" dark>
                Update
            </v-btn>
            <v-btn class="mr-3" @click="cancel()" v-if="job.status !== 'finished' || job.status !== 'ongoing' ">Cancel
                Job
            </v-btn>
            <v-btn class="mr-3" @click="finish()" color="secondary" v-if="job.status === 'ongoing'">
                Finish
            </v-btn>
            <v-btn class="mr-3" @click="reopen()" color="secondary" v-if="job.status === 'finished' || job.status === 'cancel'">
                Reopen
            </v-btn>
        </portal>
        <v-row>
            <v-col lg="3">
                <v-list>
                    <v-list-item :to="'/jobs/'+job.jobId+'/'">
                        <v-list-item-content>
                            <v-list-item-title>
                                Overview
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item :to="'/jobs/'+job.jobId+'/details'">
                        <v-list-item-content>
                            <v-list-item-title>
                               Edit Details
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item :to="'/jobs/'+job.jobId+'/references'">
                        <v-list-item-content>
                            <v-list-item-title>
                                References
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item :to="'/jobs/'+job.jobId+'/references'">
                        <v-list-item-content>
                            <v-list-item-title>
                                Schedule
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col lg="9">
                <router-view></router-view>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import JobExpandable from "../../components/Jobs/JobExpandable"
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