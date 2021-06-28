<template>
  <div>
    <v-card flat>
      <v-toolbar class="justify-center">
        <v-toolbar-title class="mr-2">
          References
        </v-toolbar-title>
        <add-reference @add="repaint()" show-buttons-in-row></add-reference>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-dialog max-width="500">
            <template v-slot:activator="{on,attrs}">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  Masonry Layout
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch prepend-icon="mdi-wall" class="mr-4" v-model="mansory" :color="job.color"
                            @click="repaint()"></v-switch>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  Show only image
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch class="mr-4" v-model="hideExtras" :color="job.color"
                            @click="repaint()">
                  </v-switch>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  Collumns
                </v-list-item-content>
                <v-list-item-action>
                  <v-select hide-details outlined style="width:100px" :color="job.color" dense label="Columns"
                            v-model="cols"
                            :items="colData"
                            @click="repaint()">
                  </v-select>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-dialog>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title v-if="job.references.hyperlinks.length && job.references.hyperlinks"> Links</v-card-title>
      <v-card-text v-if="job.references.hyperlinks.length &&  job.references.hyperlinks">
        <v-row>
          <v-col>
            <v-row no-gutters>
              <div style="display: inline;" :key="index" v-for="(hyperlink, index) in job.references.hyperlinks">
                <v-btn
                    target="_blank" :color="job.getFormatedColor(0.5)"
                    :href="hyperlink.url">
                  <v-icon class="mr-2"> mdi-link</v-icon>
                  {{ hyperlink.title || hyperlink.url }}
                </v-btn>
                <v-icon class="ma-2 mr-5" @click="removeUrl(index,hyperlink)"> mdi-delete</v-icon>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title v-if="job.references.colors.length && job.references.colors"> Colors</v-card-title>
      <v-card-text v-if="job.references.colors.length && job.references.colors">
        <v-row dense>
          <v-col lg="2" v-for="(color,index) in job.references.colors">
            <v-card>
              <v-sheet class="pa-2" :dark="isDark(color.colorHex)" :color="color.colorHex" height="70">
                <span :style="'color:'+isDark(color)?'white':'black'"> {{ color.colorHex }} </span>
                <v-toolbar color="transparent" flat dense absolute bottom>
                  {{ color.title || color.colorHex }}
                  <v-spacer/>
                  <v-icon class="ma-2 mr-5" @click="removeUrl(index,color)"> mdi-delete</v-icon>
                </v-toolbar>
              </v-sheet>

            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title v-if="job.references.links.length  && job.references.links"> Media</v-card-title>
      <v-card-text>
        <v-row dense v-masonry v-if="mansory">
          <v-col cols="12" :sm="cols" v-for="(link, index) in job.references.links" :key="index">
            <v-card>
              <v-img v-ripple
                     v-if="link.type === 'url'" :src="someImage"></v-img>
              <v-dialog
                  @input="repaint()"
                  max-width="90%"
                  transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-img contain
                         max-width="100%"
                         max-height="500px"
                         v-ripple v-on="on" v-bind="attrs" @load="this.$redrawVueMasonry()"
                         v-if="link.type === 'imageUrl'" :src="link.url"></v-img>

                </template>
                <reference-image :link="link"></reference-image>

              </v-dialog>
              <v-card-title v-if="link.title !== ''&& !hideExtras" v-on="on" v-bind="attrs">
                {{ link.title }}
              </v-card-title>
              <v-card-text v-if="link.description !== '' && !hideExtras" style="max-height: 80px;overflow: hidden ">
                {{ link.description }}
              </v-card-text>
              <v-card-actions v-if="!hideExtras">
                <v-btn text :href="link.url" target="_blank">
                  <v-icon> mdi-link</v-icon>
                  Go to Link
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="removeUrl(index, link )" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense v-else>
          <v-col cols="12" :sm="cols" v-for="(link, index) in job.references.links" :key="index">
            <v-card>
              <v-dialog
                  max-width="90%"
                  transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div>
                    <v-img
                        max-width="100%"
                        v-ripple v-on="on" v-bind="attrs"
                        v-if="link.type === 'imageUrl'" :src="link.url"></v-img>

                  </div>
                </template>
                <v-card-title v-if="link.title && !hideExtras" v-on="on" v-bind="attrs">
                  {{ link.title }}
                </v-card-title>
                <reference-image :link="link"></reference-image>

              </v-dialog>
              <v-card-text v-if="link.description && !hideExtras" style="max-height: 80px;overflow: hidden ">
                {{ link.description }}
              </v-card-text>
              <v-card-actions v-if="!hideExtras">
                <v-btn text :href="link.url" target="_blank">
                  <v-icon> mdi-link</v-icon>
                  Go to Link
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="removeUrl(index, link )" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text
          v-if="!job.references.colors.length && !job.references.hyperlinks.length && !job.references.links.length">
        You haven't add any references. Please add some using the toolbar above
      </v-card-text>

    </v-card>

  </div>
</template>

<script>
import JobMixin from "./JobMixin"
import AddReference from "@/views/Jobs/components/AddReference";
import ReferenceImage from "@/views/Jobs/components/ReferenceImage";
import tinyColor from "tinycolor2";

export default {
  name: "JobReferences",
  components: {ReferenceImage, AddReference},
  mixins: [JobMixin],
  data: () => ({
    hideExtras: false,
    colData: [
      {value: 12, text: 1},
      {value: 6, text: 2},
      {value: 4, text: 3},
      {value: 3, text: 4},
      {value: 2, text: 6},
      {value: 1, text: 12},
    ],
    mansory: true,
    cols: 3,
    modal: false,
  }),
  mounted() {
    this.repaint();
  },
  methods: {
    isDark(color) {
      return tinyColor(color).isDark();
    },
    repaint() {
      setTimeout(() => {
        this.$redrawVueMasonry()
        this.$forceUpdate()
      }, 1500);
    },
    removeUrl(index, link) {
      console.log(link)
      if (link.type === 'imageUrl') {
        this.job.references.links.splice(index, 1)
        this.repaint();
      } else if (link.type === 'color') {
        this.job.references.colors.splice(index, 1)

      } else {
        this.job.references.hyperlinks.splice(index, 1)
      }
      this.$forceUpdate();
    },
    addColor({colorHex, description}) {
      if (this.job.references === 'null') {
        this.job.references = {links: [], hyperlinks: [], colors: []}
      }
      this.job.references.colors.push({colorHex: colorHex, description: description})
    },
    addUrl({url, title, type, description}) {
      if (this.job.references === 'null') {
        this.job.references = {links: [], hyperlinks: [], colors: []}
      }
      if (this.job.references.links === undefined) {
        this.job.references['links'] = [];
      }
      if (this.job.references.hyperlinks === undefined) {
        this.job.references['hyperlinks'] = [];
      }

      if (type === 'url') {
        this.job.references.hyperlinks.push({
          url: url,
          type: type,
          title: title,
        })
      } else {
        this.$forceUpdate();
        this.repaint();
        this.job.references.links.push({
          url: url,
          title: title,
          type: type,
          description: description
        })
      }

    }
  }
}
</script>

<style scoped>

</style>
