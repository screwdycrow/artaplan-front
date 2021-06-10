<template>
  <div>
    <v-card class="mb-4" flat>
        <v-card-actions>
          <add-reference @add="repaint()" show-buttons-in-row></add-reference>
          <v-spacer></v-spacer>
          <v-switch v-model="mansory" @click="repaint()"></v-switch>
        </v-card-actions>

    </v-card>
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
            <v-icon class="ma-2 mr-5" @click="removeUrl(index,link)"> mdi-delete</v-icon>
          </div>

        </v-row>
      </v-col>
    </v-row>
    <v-row v-masonry v-if="mansory">
      <v-col cols="12" sm="3" v-for="(link, index) in job.references.links" :key="index">
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
      <v-col cols="12" sm="3" v-for="(link, index) in job.references.links" :key="index">
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

  </div>
</template>

<script>
import JobMixin from "./JobMixin"
import someImage from '@/assets/link.png'
import AddReference from "@/views/Jobs/AddReference";
import ReferenceImage from "@/views/Jobs/ReferenceImage";

export default {
  name: "JobReferences",
  components: {ReferenceImage, AddReference},
  mixins: [JobMixin],
  data: () => ({
    mansory:true,
    modal: false,
    link: {
      url: '',
      title: '',
      type: 'imageUrl',
      description: '',
    }
  }),
  mounted() {
    this.repaint();
  },
  methods: {

    repaint() {
      setTimeout(() =>{
        this.$redrawVueMasonry()
        this.$forceUpdate()
      } , 500);
    },
    removeUrl(index, link) {
      if (link.type === 'imageUrl') {
        this.job.references.links.splice(index, 1)
        this.repaint();

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
        this.job.references.links.push({
          url: url,
          title: title,
          type: type,
          description: description
        })
      }
      this.$forceUpdate();
      this.repaint();
    }
  }
}
</script>

<style scoped>

</style>
