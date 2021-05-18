<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col lg="7">
            <v-text-field dense hide-details v-model="link.url" outlined label="Url"></v-text-field>
          </v-col>
          <v-col lg="5">
            <v-text-field dense hide-details v-model="link.title" outlined label="Title"></v-text-field>
          </v-col>
          <v-col lg="12">
            <v-text-field v-if="link.type === 'imageUrl'" dense hide-details v-model="link.description" outlined
                          label="Description"></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn-toggle dense v-model="link.type">
            <v-btn value="imageUrl">
              <v-icon>mdi-image</v-icon>
              Image Url
            </v-btn>
            <v-btn value="url">
              <v-icon>mdi-link</v-icon>
              Link
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="addUrl(link)">Add</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col>
        <v-row no-gutters>
          <div style="display: inline;" v-for="(hyperlink, index) in job.references.hyperlinks">
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


    <v-row v-masonry>
      <v-col cols="12" sm="4" v-for="(link, index) in job.references.links">
        <v-card>
          <v-img v-ripple
                 v-if="link.type === 'url'" :src="someImage"></v-img>
          <v-dialog

              @input="repaint()"
              max-width="800px"
              transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <div>
                <v-img v-ripple v-on="on" v-bind="attrs" @load="this.$redrawVueMasonry()"
                       v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
                <v-card-title v-on="on" v-bind="attrs">
                  {{ link.title }}
                </v-card-title>
              </div>
            </template>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col lg="7">
                    <v-text-field dense hide-details v-model="link.url" outlined
                                  label="Url"></v-text-field>
                  </v-col>
                  <v-col lg="5">
                    <v-text-field dense hide-details v-model="link.title" outlined
                                  label="Title"></v-text-field>
                  </v-col>
                  <v-col lg="12">
                    <v-text-field dense hide-details v-model="link.description" outlined
                                  label="Description"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-img v-ripple
                     v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
            </v-card>
          </v-dialog>
          <v-card-text v-if="link.description">
            {{ link.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn :href="link.url" target="_blank"> Go to Link</v-btn>
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

export default {
  name: "JobReferences",
  mixins: [JobMixin],
  data: () => ({
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
      setTimeout(() => this.$redrawVueMasonry(), 1500);
    },
    removeUrl(index, link) {
      if (link.type !== 'imageUrl') {
        this.job.references.links.splice(index, 1)
      } else {
        this.job.references.hyperlinks.splice(index, 1)
      }
    },
    addUrl({url, title, type, description}) {
      if (this.job.references === 'null') {
        this.job.references = {links: [], hyperlinks: []}
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
      this.repaint();

    }
  }
}
</script>

<style scoped>

</style>
