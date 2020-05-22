<template>
    <div>
        <v-toolbar prominent extended color="transparent" flat> <h1>Manage Slots</h1> </v-toolbar>
        <v-row>
            <v-col sm="12" lg="3">
                <schedule-entry-item :item="scheduleEntry"/>
                <schedule-entry-item :item="scheduleEntry"/>
                <schedule-entry-item :item="scheduleEntry"/>
            </v-col>
            <v-col sm="12" lg="3">
                <v-expansion-panels multiple>
                    <job-expandable v-for="job in jobs" :job="job" />
                </v-expansion-panels>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    import ScheduleEntry from "@/classes/ScheduleEntry";
    import ScheduleEntryItem from "@/components/Schedule/ScheduleEntryItem";
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions, mapGetters, mapMutations} = createNamespacedHelpers('jobs');
    export default {
        name: "Preview",
        data:()=>({
           scheduleEntry:new ScheduleEntry({
               scheduleEntryId:1,
               jobStageId:2,
               scheduledAt: "2020-05-31",
               isDeadline:false,
               done:false,
               hours:1,
               jobStage:{
                   jobStageId:3,
                   jobId:1,
                   stageId:2,
                   order:1,
                   jobHours:2,
                   workHours:0,
                   stage:{
                       stageId:2,
                       name:"poses",
                       desription:"collect poses references and make poses",
                       avgHours:5,
                       insertedAt:"2020-03-20",
                       estimatedHours:5
                   },
                   job:{
                       jobId:1,
                       status:"ongoing",
                       color:"blue",
                       image:"https://cdnb.artstation.com/p/assets/images/images/026/484/381/large/dimitris-tzilivakis-fina4.jpg",
                       toStartAt:"2020-05-11",
                       price:40,
                       name:"black Dragon",
                       priority:1,
                       insertedAt:"2020-05-11",
                       deadline:"2020-06-01",
                       references:"",
                       customer:{
                           name:"Heathen"
                       }
                   }
               }
           })
        }),
        components: {JobExpandable, ScheduleEntryItem},
        computed:{
          ...mapGetters([
              "jobs"
          ])
        },
        created() {
            this.getOngoingJobs();
        },
        methods:{
            ...mapActions([
                "getOngoingJobs"
            ]),
        }
    }
</script>

<style scoped>

</style>
