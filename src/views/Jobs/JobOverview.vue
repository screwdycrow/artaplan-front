<template>
  <div>
    <add-reference/>
    <v-row>
      <v-col>
        <v-card flat class="fill-height">
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon> mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                {{ job.customer.name }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon> mdi-brush</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                {{ job.slot.name }}
              </v-list-item-content>
            </v-list-item>
          </v-list>

        </v-card>
      </v-col>
      <v-col>
        <v-card flat class="fill-height">
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <strong> Started: </strong>
              </v-list-item-action>
              <v-list-item-content>
                {{ job.startedAt | formatDate }}
              </v-list-item-content>
              <v-list-item-action>
                <strong> Finished: </strong>
              </v-list-item-action>
              <v-list-item-content>
                {{ job.finishedAt | formatDate }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <strong> Deadline: </strong>
              </v-list-item-action>
              <v-list-item-content>
                {{ job.deadline | formatDate }}
              </v-list-item-content>

            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card flat class="fill-height">
          <v-card-text>
            <label>earnings</label>
            <br/>
            <span class="text-md-h3">{{ job.price }} € </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col lg="2">
        <v-card flat>
          <v-card-text>
            <p>completed</p>
            <span class="text-md-h3">{{ job.getCompletionPercentage() }}%</span>
          </v-card-text>
          <v-progress-linear :color="job.color" style="position: absolute; bottom:0;"
                             :value="job.getCompletionPercentage()"/>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card flat :color="job.isOverWork()?'red lighten-4':''">
          <v-card-text>
            <p> hours spent</p>
            <span class="text-md-h3">{{ job.getHoursSpent() }}hr</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card flat :color="job.isOverWork()?'red lighten-4':''">
          <v-card-text>
            <p> hours left</p>
            <span class="text-md-h3">{{ job.getHoursLeft() }}hr</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card flat :color="job.isOverWork()?'red lighten-4':''">
          <v-card-text>
            <p>value/hr</p>
            <span class="text-md-h3">{{ job.getValue() | fixed(2) }}€</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="2" v-if="job.isOverWork()">
        <v-card flat>
          <v-card-text>
            <p>Initial value/hr</p>
            <span class="text-md-h3">{{ (job.price / job.getJobHours()) | fixed(2) }}€</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="2" v-if="job.isOverWork()">
        <v-card flat>
          <v-card-text>
            <p>Actual price </p>
            <span
                class="text-md-h3">{{ (job.price - job.getHoursLeft() * (job.price / job.getJobHours()))| fixed(0) }}€</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-row no-gutters>
          <div style="display: inline;" :key="index" v-for="(hyperlink, index) in job.references.hyperlinks">
            <v-btn

                class="mr-3"
                target="_blank" :color="job.getFormatedColor(0.5)"
                :href="hyperlink.url">
              <v-icon class="mr-2"> mdi-link</v-icon>
              {{ hyperlink.title || hyperlink.url }}
            </v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="8">
        <v-card class="fill-height"  flat>
          <v-card-title> Description
            <v-spacer/>
            Text Size
            <v-btn icon @click="fontsize++; lineHeight++">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon @click="fontsize--; lineHeight--">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text :style='"font-size:"+fontsize+"px;lineHeight:"+lineHeight+"px" ' v-html="job.description">
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4">
        <v-row dense>
          <v-col lg="4" :key="index" v-for="(color, index)  in job.references.colors">
            <v-card :dark="isDark(color.colorHex)" :color="color.colorHex">
              <v-card-text>{{ color.colorHex }}</v-card-text>
            </v-card >
          </v-col>
          <v-col lg="4" :key="index" v-for="(link, index) in job.references.links">
            <v-card>
              <v-dialog
                  max-width="80%"
                  transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-img aspect-ratio="1" v-ripple v-on="on" v-bind="attrs"
                         v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
                </template>
                <reference-image :link="link"></reference-image>
              </v-dialog>
              <v-img v-ripple
                     v-if="link.type === 'url'" src="link.png"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


  </div>

</template>

<script>
import tinyColor from 'tinycolor2'
import JobMixin from "./JobMixin"
import AddReference from "@/views/Jobs/components/AddReference";
import ReferenceImage from "@/views/Jobs/components/ReferenceImage";

export default {
  components: {ReferenceImage, AddReference},
  data: () => ({
    lineHeight: 24,
    fontsize: 16,
    hoursSpent: 0,
    hoursLeft: 0,
    valuePerHour: 0,
  }),
  methods: {
    isDark(color){
      return tinyColor(color).isDark();
    }
  },
  watch: {},
  name: "JobOverview",
  mixins: [JobMixin],

}
</script>

<style scoped>

</style>
