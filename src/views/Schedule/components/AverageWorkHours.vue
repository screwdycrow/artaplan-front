<template>
<v-card>
  <v-toolbar flat dense>
    <v-toolbar-title>
      Average Hours
    </v-toolbar-title>
  </v-toolbar>
  <v-list dense>
    <v-list-item v-for="(day,index) in dayStats">
      <v-list-item-content> {{ day.name }}</v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text>60 days</v-list-item-action-text>
        {{ (day.workHours / day.dayCount) | fixed(1) }}h
      </v-list-item-action>
      <v-list-item-action>
        <v-list-item-action-text> 30 days</v-list-item-action-text>
        <span>
                {{ (day.workHoursMonth / day.dayCountMonth) | fixed(1) }}h
                <v-icon small color="success"
                        v-if="(day.workHoursMonth/day.dayCountMonth) > (day.workHours/day.dayCount) ">
                  mdi-chevron-up
                </v-icon>
                <v-icon small color="error"
                        v-else-if="(day.workHoursMonth/day.dayCountMonth) < (day.workHours/day.dayCount) ">
                  mdi-chevron-down
                </v-icon>
                <v-icon small v-else>
                  mdi-minus
                </v-icon>
              </span>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AverageWorkHours",
  computed:{
    ...mapGetters(
        'schedule',
        [
          "days",
          "dayStats"
        ]),

  }
}

</script>

<style scoped>

</style>
