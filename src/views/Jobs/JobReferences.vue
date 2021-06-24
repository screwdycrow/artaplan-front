<template>
  <div>
    <v-card class="mb-6">
        <v-card-actions class="justify-center">
          <add-reference @add="repaint()" show-buttons-in-row></add-reference>
          <v-spacer></v-spacer>
          <v-switch prepend-icon="mdi-wall"  class="mr-4" v-model="mansory" @click="repaint()"></v-switch>
            <div>
              <v-select hide-details outlined style="width:100px" dense label="Columns" v-model="cols" :items="colData" @click="repaint()">
              </v-select>
            </div>
        </v-card-actions>

    </v-card>

    <v-row>
      <v-col>
        <v-row no-gutters >
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
    <v-row v-if="job.references.colors">
      <v-col lg="2" v-for="(color,index) in job.references.colors">
        <v-card>
          <v-sheet :color="color.colorHex" height="100">
            <span class="white"> {{color.colorHex}} </span>
          </v-sheet>
          <v-toolbar flat dense>
            {{color.title || color.colorHex}}
            <v-spacer/>
            <v-icon class="ma-2 mr-5" @click="removeUrl(index,color)"> mdi-delete</v-icon>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-masonry v-if="mansory">
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
              <div>
                <v-img contain
                    max-width="100%"
                    max-height="500px"
                    v-ripple v-on="on" v-bind="attrs" @load="this.$redrawVueMasonry()"
                       v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
                <v-card-title v-on="on" v-bind="attrs">
                  {{ link.title }}
                </v-card-title>
              </div>
            </template>
            <reference-image :link="link"></reference-image>

          </v-dialog>
          <v-card-text v-if="link.description" style="max-height: 80px;overflow: hidden " >
            {{ link.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn  text :href="link.url" target="_blank"><v-icon> mdi-link</v-icon> Go to Link  </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="removeUrl(index, link )" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" :sm="cols" v-for="(link, index) in job.references.links" :key="index">
        <v-card>
          <v-dialog
              @input="repaint()"
              max-width="90%"
              transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <div>
                <v-img contain height="300"
                       max-width="100%"
                       v-ripple v-on="on" v-bind="attrs" @load="this.$redrawVueMasonry()"
                       v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
                <v-card-title v-on="on" v-bind="attrs">
                  {{ link.title }}
                </v-card-title>
              </div>
            </template>
            <reference-image :link="link"></reference-image>

          </v-dialog>
          <v-card-text v-if="link.description" style="max-height: 80px;overflow: hidden " >
            {{ link.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn  text :href="link.url" target="_blank"><v-icon> mdi-link</v-icon> Go to Link  </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="removeUrl(index, link )" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import JobMixin from "./JobMixin"
import AddReference from "@/views/Jobs/components/AddReference";
import ReferenceImage from "@/views/Jobs/components/ReferenceImage";

export default {
  name: "JobReferences",
  components: {ReferenceImage, AddReference},
  mixins: [JobMixin],
  data: () => ({
    colData:[
      {value:12,text:1},
      {value:6,text:2},
      {value:4,text:3},
      {value:3,text:4},
      {value:2,text:6},
      {value:1,text:12},
    ],
    mansory:true,
    cols:3,
    modal: false,
  }),
  mounted() {
    this.repaint();
  },
  methods: {

    repaint() {
      setTimeout(() =>{
        this.$redrawVueMasonry()
        this.$forceUpdate()
      } , 1500);
    },
    removeUrl(index, link) {
      console.log(link)
      if (link.type === 'imageUrl') {
        this.job.references.links.splice(index, 1)
        this.repaint();
      }else if(link.type === 'color'){
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
