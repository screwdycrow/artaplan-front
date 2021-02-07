<template>
    <div>
        <portal to="toolbar-title">
            Jobs
        </portal>
        <portal to="toolbar-items">
        </portal>
        <portal to="toolbar-actions">
            <v-btn color="primary" to="/newJob">
                <v-icon> mdi-plus</v-icon>
                New
            </v-btn>
        </portal>
        <v-row>
            <v-col sm="12" lg="10">
                <h2> Ongoing ({{ongoingJobs.length}})</h2>
                <v-row>
                    <v-col>

                        <swiper :options="swiperOptions" v-if="ongoingJobs.length">
                            <swiper-slide v-for="job in ongoingJobs">
                                <job-item :job="job"></job-item>
                            </swiper-slide>
                        </swiper>
                        <v-card flat color="transparent" v-else>
                            <v-card-text>
                                There are no ongoing jobs
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>

                    <v-col lg="6">
                        <h2> Idle ({{idleJobs.length}})</h2>
                        <swiper v-if="idleJobs.length" :options="swiperOptions2">
                            <swiper-slide v-for="job in idleJobs">
                                <job-item :job="job"></job-item>
                            </swiper-slide>
                        </swiper>
                        <v-card v-else flat color="transparent" >
                            <v-card-text>
                                There are no ongoing jobs
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="6">
                        <h2> Scheduled ({{scheduledJobs.length}})</h2>

                        <swiper v-if="scheduledJobs.length" :options="swiperOptions2">
                            <swiper-slide v-for="job in scheduledJobs">
                                <job-item :job="job"></job-item>
                            </swiper-slide>
                        </swiper>
                        <v-card v-else flat color="transparent" v-else>
                            <v-card-text>
                                There are no scheduled jobs
                            </v-card-text>
                        </v-card>
                    </v-col>

                </v-row>
            </v-col>
        </v-row>
    </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import NewJob from "@/views/Jobs/NewJob";
    import JobItem from "../../components/Jobs/JobItem"
    import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'

    export default {
        name: "Jobs",
        data: () => ({
            swiperOptions: {
                slidesPerView: 4,
                spaceBetween: 10,
                freeMode: true,
            },
            swiperOptions2: {
                slidesPerView: 2,
                spaceBetween: 10,
                freeMode: true,
            }
        }),
        components: {
            JobItem,
            JobExpandable,
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        },
        computed: {
            ...mapGetters('jobs', [
                'ongoingJobs',
                'pastJobs',
                'scheduledJobs',
                'idleJobs'
            ])
        },
        methods: {
            ...mapActions('jobs', [
                "getJobs",
            ]),
        },

        created() {
            this.getJobs();
        }
    }
</script>

<style scoped>

</style>
