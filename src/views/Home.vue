<template>
    <div class="home" id="content">
        <portal to="toolbar-title"> Dashboard</portal>
        <portal to="toolbar-actions">
        </portal>

        <v-row >
            <v-col sm="12" lg="6" class="mb-5">
                <v-card color="transparent">
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Today's schedule</strong>
                        </v-toolbar-title>
                        <v-spacer/>
                        <v-chip>4/5 hours</v-chip>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-list two-line>
                        <stage-item/>
                        <stage-item/>
                        <stage-item/>
                    </v-list>
                </v-card>
            </v-col>
            <v-col sm="12" lg="6">
                <v-card color="transparent">
                    <v-toolbar flat color="transparent">
                        <v-toolbar-title>
                            <strong class="text--primary"> Next Stage Deadlines</strong>
                        </v-toolbar-title>
                        <v-spacer/>
                        <v-toolbar-items>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-list two-line>
                        <stage-item/>
                        <stage-item/>
                        <stage-item/>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-toolbar flat color="transparent">
            <v-toolbar-title>
                <strong class="text--primary"> Ongoing jobs (5) </strong>
            </v-toolbar-title>
            <v-toolbar-items>
            </v-toolbar-items>
            <v-spacer/>

        </v-toolbar>
        <v-row dense="">
            <v-card width="240" class="mb-3 mr-3" >
                <v-list dense class="text-center">
                    <v-list-item>

                        <v-list-item-content>
                            <v-list-item-title>
                                <strong> Expected Income:</strong>
                            </v-list-item-title>
                            <v-list-subtitle>
                                250$
                            </v-list-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                                <strong> Last Deadline:</strong>
                            </v-list-item-title>
                            <v-list-subtitle>
                                29/4/2020
                            </v-list-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                                <strong> Total Hours :</strong>
                            </v-list-item-title>
                            <v-list-subtitle>
                                12/20
                            </v-list-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-card-actions class="justify-center ">
                    <v-btn outlined color="primary"> New Job</v-btn>
                </v-card-actions>
            </v-card>
            <job-card/>
            <job-card/>
            <job-card/>
            <job-card/>
            <job-card/>
        </v-row>


        <v-row>
            <v-col>

            </v-col>
            <v-col>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import JobCard from "../components/Jobs/JobCard"
    import StageItem from "../components/Stages/StageItem"

    export default {
        name: 'Home',
        components: {
            StageItem,
            JobCard,
            HelloWorld
        }
    }
</script>
