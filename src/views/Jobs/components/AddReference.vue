<template>
  <div>
    <v-dialog v-model="open" @change="resetLink()" max-width="500">
      <v-card class="">
        <v-card-title> Add a {{ label[link.type] }}</v-card-title>
        <v-card-text>
          <v-form v-if="link.type === 'imageUrl'">
            <v-text-field dense v-model="link.url" outlined label="Url"></v-text-field>
            <v-text-field dense v-model="link.title" outlined label="Title"></v-text-field>
            <v-textarea dense hide-details v-model="link.description" outlined
                        label="Description">
            </v-textarea>
          </v-form>
          <v-form v-else-if="link.type === 'color'">
            <v-text-field dense v-model="link.title" outlined label="Title"></v-text-field>
            <v-color-picker v-model="link.colorHex" width="480" mode="hexa" hide-mode-switch ></v-color-picker>
          </v-form>
          <v-form v-else>
            <v-text-field dense v-model="link.url" outlined label="Url"></v-text-field>
            <v-text-field dense v-model="link.title" outlined label="Title"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  class="primary" @click="addReference(link)">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row v-if="showButtonsInRow">
      <v-btn
          class="ma-3"
          color="primary"
          text
          dark
          @click="openDialog('imageUrl')"
      >
        <v-icon> mdi-image</v-icon>
        Add Image
      </v-btn>
      <v-btn
          class="ma-3"
          color="primary"
          text
          dark
          @click="openDialog('url')"
      >
        <v-icon> mdi-link</v-icon>
        Add Link
      </v-btn>
      <v-btn
          class="ma-3"
          color="primary"
          text
          dark
          @click="openDialog('color')"
      >
        <v-icon> mdi-palette</v-icon>
        Add Color
      </v-btn>
    </v-row>
    <v-speed-dial v-else direction="top" bottom right v-model="fab" fixed transition="scale">
      <template v-slot:activator>
        <v-btn
            v-model="fab"
            color="primary"
            dark
            direction="bottom"
            bottom right
            fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-pin
          </v-icon>
        </v-btn>
      </template>
      <v-btn
          color="secondary"
          fab
          dark

          @click="openDialog('imageUrl')"
      >
        <v-icon> mdi-image</v-icon>
      </v-btn>
      <v-btn
          color="secondary"
          fab
          dark

          @click="openDialog('url')"
      >
        <v-icon> mdi-link</v-icon>
      </v-btn>
      <v-btn
          color="secondary"
          fab
          dark

          @click="openDialog('color')"
      >
        <v-icon> mdi-palette</v-icon>
      </v-btn>



    </v-speed-dial>
  </div>

</template>

<script>
import JobMixin from "@/views/Jobs/JobMixin";

export default {
  name: "AddReference",
  mixins: [JobMixin],
  data: () => ({
    label: {
      imageUrl: 'Image URL',
      url: 'Quick Link',
      color: 'Color'
    },
    link: {
      url: '',
      title: '',
      type: 'imageUrl',
      description: '',
      colorHex: ''
    },
    fab: false,
    open: false
  }),

  methods: {
    openDialog(type) {
      this.resetLink();
      this.link.type = type;
      this.open = true;
    },

    addReference({url, title, type, description, colorHex}) {
      if (this.job.references === 'null') {
        this.job.references = {links: [], hyperlinks: [], colors: []}
      }
      if (this.job.references.links === undefined) {
        this.job.references['links'] = [];
      }
      if (this.job.references.hyperlinks === undefined) {
        this.job.references['hyperlinks'] = [];
      }
      if (this.job.references.colors === undefined) {
        this.job.references['colors'] = []
      }

      if (type === 'url') {
        this.job.references.hyperlinks.push({
          url: url,
          type: type,
          title: title,
        })
      } else if (type === 'color') {
        this.job.references.colors.push({
          colorHex: colorHex,
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
      this.$emit('add')
      this.update();
      this.resetLink();
    },

    resetLink() {
      this.link = {
        type: this.link.type,
        url: '',
        title: '',
        description: '',
        colorHex: ''
      }
    }
  },
  props: {
    showButtonsInRow: {type: Boolean, default: null, required: false}
  }
}

</script>

<style scoped>

</style>
