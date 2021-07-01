<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>
        Average Hours Chart
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn-toggle dense tile group v-model="type">
          <v-btn  value="bar"> <v-icon>mdi-chart-bar</v-icon></v-btn>
          <v-btn  value="line"> <v-icon>mdi-chart-bell-curve-cumulative</v-icon></v-btn>
        </v-btn-toggle>
      </v-toolbar-items>
    </v-toolbar>
    <apexchart  width="100%" height="400" :type="type" :options='{...options,xaxis:{categories:chartDataMonth.categories}}'
               :series="chartDataMonth.series"/>

  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "WorkHoursChart",
  data: () => ({
    type:'bar',
    options: {
      chart: {
        id: "vuechart-example"
      },
      theme: {
        palette:'palette1',
        mode: "light"
      },
      yaxis: {
        max:6,
        min:1,
        show: true
      },

    },
  }),
  created() {
    this.options.theme.mode = this.settings.darkMode?'dark':'light'
  },
  computed: {

    chartDataMonth() {
      let data = {series: [], categories: []}
      let monthHours = {data:[],name:'Last 30 days'};
      let hours = {data:[],name:'Last 60 days'};
      for (const day in this.dayStats) {
        if (this.dayStats.hasOwnProperty(day)) {
          data.categories.push (this.dayStats[day].name)
          monthHours.data.push( (this.dayStats[day].workHoursMonth)/this.dayStats[day].dayCountMonth)
          hours.data.push((this.dayStats[day].workHours)/this.dayStats[day].dayCount)
        }
      }
      data.series = [hours,monthHours]
      return data
    },
    ...mapGetters(
        'schedule',
        [
          "dayStats"
        ]),
    ...mapGetters(
        [
          "settings"
        ]),

  }
}
</script>

<style scoped>

</style>
