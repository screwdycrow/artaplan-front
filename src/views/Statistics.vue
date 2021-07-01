<template>
  <div>
    <portal to="toolbar-title">
      Statistics
    </portal>
    <portal to="toolbar-items">
    </portal>
    <portal to="toolbar-actions">
    </portal>
    <v-row>
      <v-col lg="3">
        <average-work-hours></average-work-hours>
      </v-col>
      <v-col lg="9">
        <work-hours-chart></work-hours-chart>
      </v-col>
    </v-row>

  </div>


</template>

<script>
import AverageWorkHours from "@/views/Schedule/components/AverageWorkHours";
import WorkHoursChart from "@/views/Schedule/components/WorkHoursChart";
export default {
name: "Statistics",
  components: {WorkHoursChart, AverageWorkHours}
}
</script>

<style scoped>

</style>
