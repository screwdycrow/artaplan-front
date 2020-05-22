<template>
    <div>
        <v-expansion-panels multiple hover class="pa-0">
            <job-expandable v-for="job in jobs" :job="job"/>
        </v-expansion-panels>
    </div>
</template>

<script>
    import JobExpandable from "@/components/Jobs/JobExpandable";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "JobPreviewList",
        components: {JobExpandable},
        props: {
            jobs: Array,
        },
    }
</script>

<style scoped>

</style>
