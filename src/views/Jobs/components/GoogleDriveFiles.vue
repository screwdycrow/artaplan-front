<template>
  <v-card flat>
    <v-dialog max-width="90%" v-if="fileIndex!== null" v-model="showDialog">
      <v-row no-gutters>
        <v-col lg="10">
          <v-card tile flat dark height="90vh">
            <iframe
                height="100%"
                width="100%"
                style="background: #333"
                :src="getEmbedLink(files[fileIndex])">
            </iframe>
          </v-card>

        </v-col>
        <v-col lg="2">
          <v-card class="fill-height">
            <v-card-title> {{ files[fileIndex].name }}</v-card-title>
            <v-card-actions>
              <v-btn v-if="fileIndex !== 0 " text @click="fileIndex--"> Previous</v-btn>
              <v-btn v-if="fileIndex+1 < files.length" text @click="fileIndex++"> Next</v-btn>
            </v-card-actions>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-calendar</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  {{ files[fileIndex].createdTime | formatDate('DD/MM/YYYY HH:m') }}
                  <v-list-item-subtitle>
                    Uploaded
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-card-text>
              <v-form>
                <v-text-field readonly outlined label="name" v-model="files[fileIndex].name"></v-text-field>
                <v-textarea readonly outlined label="description" v-model="files[fileIndex].description">
                </v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" target="_blank" :href="files[fileIndex].webViewLink">Edit File in Google Drive
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
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
      <training-button v-if="files.length" :job="job" :images="trainingFiles"></training-button>
      <v-btn :color="job.color" v-if="folderId" icon target="_blank"
             :href="`https://drive.google.com/drive/folders/${folderId}`">
        <v-icon>mdi-google-drive</v-icon>
      </v-btn>
      <v-btn :color="job.color" @click="getFiles()" icon>
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text v-if="!isSignedIn">
      You haven't logged in with google drive
      <google-button></google-button>
    </v-card-text>
    <v-card-text v-if="!files.length && !loadingFiles">
      No files found in your Google Drive. When you add files either directly
      either through the file uploader they will appear here.
    </v-card-text>
    <v-card-text>
      <v-data-iterator :items="files" :items-per-page="12" options="">
        <template v-slot:default="{items}">
          <v-row v-masonry v-if="!loadingFiles">

            <v-col lg="3" v-for="(file) in items">
              <v-card >
                <v-img @click="openDialog(file)"v-on="on" v-bind="attrs"
                       @load="$redrawVueMasonry()" :src="file.thumbnailLink"></v-img>
                <v-toolbar flat dense >
                  <v-toolbar-title @click="openDialog(file)" style=" cursor:pointer; font-size:1em; line-height: 1em;">
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
        </template>

      </v-data-iterator>

    </v-card-text>
  </v-card>

</template>

<script>
import {mapActions, mapState} from "vuex"
import gdFiles from "@/api/gdFiles";
import TrainingButton from "@/views/Jobs/components/TrainingButton";
import GoogleButton from "@/views/Settings/components/GoogleButton";

export default {
  name: "GoogleDriveFiles",
  components: {GoogleButton, TrainingButton},
  data: () => ({
    file: null,
    files: [],
    description: null,
    isSignedIn: true,
    loadingFiles: true,
    showDialog: null,
    fileIndex: null,
  }),
  created() {
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.isSignedIn = isSignedIn
      if (isSignedIn) {
        this.getFiles()
        this.setDefaultDescription();
      } else {
        this.loadingFiles = false
      }
    })
  },
  computed: {
    trainingFiles() {
      return this.files.filter(file => file.mimeType.includes('image')).map(file => ({
        link: file.webContentLink,
        thumbnail: file.thumbnailLink
      }))
    },
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
    openDialog(file) {
      this.fileIndex = this.files.findIndex(f => f.webContentLink === file.webContentLink);
      this.showDialog = true
    },
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
