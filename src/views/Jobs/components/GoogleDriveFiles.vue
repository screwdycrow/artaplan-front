<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-title class="mr-3"> Files</v-toolbar-title>
      <v-dialog max-width="500" @change="setDefaultDescription()">
        <template v-slot:activator="{on,attrs}">
          <v-btn v-on="on" v-bind="attrs" text :color="job.color">
            <v-icon>mdi-folder-image</v-icon>
            New File
          </v-btn>
        </template>
        <v-card>
          <v-card-title> Add file to Google Drive</v-card-title>
          <v-card-text>
            <v-form>
              <v-file-input label="file" outlined accept=".png, .jpg, .tiff, .tif, .webp, .gif" v-model="file"
                            class="mr-4"></v-file-input>
              <v-textarea v-model="description" outlined label="description"></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addJobFile()" :disabled="file === null"> Add A File</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-btn :color="job.color" v-if="folderId" icon target="_blank"
             :href="`https://drive.google.com/drive/folders/${folderId}`">
        <v-icon>mdi-google-drive</v-icon>
      </v-btn>
      <v-btn :color="job.color" @click="getFiles()" icon>
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-toolbar>
      <v-card-text v-if="!files.length">
        No files found in your Google Drive. When you add files either directly
        either through the file uploader they will appear here.
      </v-card-text>
    <v-card-text>
    <v-row v-masonry v-if="!loadingFiles">
      <v-col lg="3" v-for="(file,index) in files" :key="index">
        <v-card>
          <v-dialog max-width="90%">
            <template v-slot:activator="{ on, attrs }">
              <v-img :src="file.webContentLink" v-on="on" v-bind="attrs"
                     @load="$redrawVueMasonry()"
                     alt="google drive file"/>
            </template>
            <v-row no-gutters>
              <v-col lg="10">
                <iframe
                    height="800"
                    width="100%"
                    style="background: #333"
                    :src="getEmbedLink(file)">
                </iframe>
              </v-col>
              <v-col lg="2">
                <v-card class="fill-height">
                  <v-card-title> {{ file.name }}</v-card-title>
                  <v-list>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon>mdi-clock</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        {{ file.createdTime | formatDate('DD/MM/YYYY HH:m') }}
                        <v-list-item-subtitle>
                          Uploaded
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-card-text>
                    <v-form>
                      <v-text-field readonly outlined label="name" v-model="file.name"></v-text-field>
                      <v-textarea readonly outlined label="description" v-model="file.description">
                      </v-textarea>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="success" target="_blank" :href="file.webViewLink">Edit File in Google Drive</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-dialog>
          <v-toolbar flat dense>
            <v-toolbar-title style="font-size:1em; line-height: 1em;">
              {{ file.name }}
              <br>
              <span style="font-size: 0.8em">
              {{ file.createdTime | formatDate }}
              </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon @click="deleteFile(file,index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col lg="12" class="d-flex justify-center">
        <v-progress-circular size="50" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
import {mapActions, mapState} from "vuex"
import gdFiles from "@/api/gdFiles";

export default {
  name: "GoogleDriveFiles",
  data: () => ({
    file: null,
    files: [],
    description: null,
    loadingFiles: false,
  }),
  created() {
    this.getFiles()
    this.setDefaultDescription();
  },
  computed: {
    ...mapState('jobs', [
      'folderId',
      'job'
    ])
  },
  methods: {
    ...mapActions('jobs', [
      'gdAddJobFile',
      'gdGetJobFolderId',
      'gdCreateJobFolder',
      'gdGetJobFiles'
    ]),
    repaint() {
      setTimeout(() => {
        this.$forceUpdate()
        this.$redrawVueMasonry()
      }, 2000);
    },
    updateFile(file) {
      this.$gapi.getGapiClient()
          .then(gapi => gdFiles.updateFile(gapi, file.id, {description: file.description, name: file.name}))
          .then(success => {
            this.repaint();
          })
    },
    deleteFile(file, index) {
      this.$gapi.getGapiClient()
          .then(gapi => gdFiles.deleteFile(gapi, file.id))
          .then(success => {
            if (success) this.files.splice(index, 1)
            this.repaint();
          })
    },
    getFiles() {
      this.loadingFiles = true
      return this.gdGetJobFiles()
          .then(files => {
            this.files = files
            this.loadingFiles = false
            this.repaint();
          })
    },
    setDefaultDescription() {
      this.description = `Uploaded after ${this.job.getHoursSpent()} has been spent`
    },
    getEmbedLink(file) {
      return file.webViewLink.replace('/view', '/preview')
    },
    addJobFile() {
      this.loadingFiles = true
      if (this.file !== null) {
        this.gdAddJobFile({file: this.file, extras: {description: this.description}})
            .then(file => {
              console.log(file)
              this.files.unshift(file)
              this.repaint();
              this.loadingFiles = false;
              this.file = null;
              this.setDefaultDescription()
            })

      }
    }
  }
}
</script>

<style scoped>

</style>
