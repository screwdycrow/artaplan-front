<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card min-height="250" outlined :color="today === day?'secondary lighten-3':''">
    <v-toolbar :style="`color:${workLoadColor}`" dense flat>
      <v-toolbar-title>
        {{ day | dayName }}
      </v-toolbar-title>
      <v-spacer/>
      {{ day | format }}
      <v-menu open-on-hover>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon v-on="on" v-bind="attrs" :color="workLoadColor" small>
            <v-icon small> mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <v-card flat>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>
                  Average Hours
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ day | formatDate('dddd') }}
                </v-list-item-title>

              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text> 30 days</v-list-item-action-text>
                <span style="font-size: 0.8em">
                {{ dayStatsDifference.average }}h
              </span>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Difference
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <span style="font-size: 0.8em">
                {{ dayStatsDifference.difference | fixed(2) }}h
              </span>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-text>
            <span v-if="dayStatsDifference.difference <= -0.7 ">
              You probably have put too many hours in this day.
            </span>
            <span v-else-if="dayStatsDifference.difference > 1">
              You have space for more hours this day.
            </span>
          </v-card-text>
        </v-card>
      </v-menu>


    </v-toolbar>
    <v-list dense class="fill-height">
      <v-list-item dense v-for="j in deadlinesOfDay(day)">
        <v-list-item-action>
          <v-icon color="#ff1b0e  ">mdi-flag-checkered</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title style="color:#ff1b0e;">{{ j.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <drop-list :key="v" style="min-height: 200px;" :class="day+' fill-height'" mode="cut"
                 :items="entriesOfDay(day)" @insert="onInsert">
        <template v-slot:item="{item}">
          <drag :key="item.tempId" :data="item" @cut="onCut(item)">
            <schedule-entry-item :entry="item" @onDone="v++" @onDelete="v++">
            </schedule-entry-item>
          </drag>
        </template>
        <template v-slot:inserting-drag-image="{data}">
          <v-list-item-avatar style="transform:translate(-50%, -50%) scale(1.5)">
          </v-list-item-avatar>
        </template>
        <template v-slot:reordering-drag-image/>
        <template v-slot:feedback="{data}">
          <v-skeleton-loader
              type="list-item-two-line"
              :key="data.tempId"
              :style="'border-left: 4px solid; margin-left: -2px;'"
          />
        </template>
      </drop-list>
    </v-list>
  </v-card>


</template>

<script>
import {Drag, DropList} from "vue-easy-dnd"
import ScheduleEntryItem from "./ScheduleEntryItem"
import {mapActions, mapGetters, mapMutations} from "vuex"
import JobStage from "../../../classes/JobStage"
import moment from "moment"

export default {
  name: "DayEntries",
  components: {ScheduleEntryItem, DropList, Drag},
  props: {
    day: String,
    dayEntries: Array
  },
  data: () => ({
    v: 1,
    today: moment().format("YYYY-MM-DD"),
  }),
  filters: {

    format(date) {
      return moment(date).format('DD/MM')
    },
    dayName(date) {
      return moment(date).format('ddd')
    },
  },
  watch: {},
  methods: {
    ...mapActions('schedule',
        [
          "addScheduleEntry",
          "updateScheduleEntry",
          "changeDateEntry"
        ]
    ),
    ...mapMutations('schedule', [
      "addEntryToDay",
      "removeEntryFromDay"
    ]),
    onCut(value) {
    },
    onInsert(event) {
      let item = event.data;
      console.log('start bonking ', item)
      if (item instanceof JobStage) {
        this.addScheduleEntry({jobStage: item, date: this.day}).then(entry => {
          console.log('new bonk')
          this.v++;
        })
      } else {
        this.changeDateEntry({
          entry: item,
          date: this.day
        }).then(() => {
          this.v++;

        })
      }
    },

  },
  computed: {
    workLoadColor() {
      if (this.dayStatsDifference.difference < -0.7 && this.dayStatsDifference.difference >= -1.3 && moment(this.day).isAfter(moment().subtract(1, 'days'))) {
        return this.$vuetify.theme.themes.dark.warning
      } else if (this.dayStatsDifference.difference < -1.3 && moment(this.day).isAfter(moment().subtract(1, 'days'))) {
        return this.$vuetify.theme.themes.dark.error
      } else if (this.dayStatsDifference.difference >= 1 && moment(this.day).isAfter(moment().subtract(1, 'days'))) {
        return this.$vuetify.theme.themes.dark.success
      } else {
        return ''
      }
    },
    dayStatsDifference() {
      const stats = this.dayStats[moment(this.day).day()]
      const average = stats.workHoursMonth / stats.dayCountMonth;
      return {
        average: average,
        difference: average - this.entriesOfDay(this.day).length
      }
    },
    ...mapGetters('jobs', [
      "deadlinesOfDay"
    ]),
    ...mapGetters('schedule', [
      "entriesOfDay",
      "dayStats",
    ])
  }

}
</script>

<style scoped>

</style>
