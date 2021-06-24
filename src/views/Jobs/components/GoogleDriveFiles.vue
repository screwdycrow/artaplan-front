<template>
  <div>
    <v-row>
      <v-col lg="12">
        <v-card>
          <v-card-actions>
            <v-file-input accept=".png, .jpg, .tiff, .tif, .webp, .gif" v-model="file" class="mr-4"></v-file-input>
            <v-btn color="primary" @click="addJobFile()" :disabled="file===null"> Add A File</v-btn>
            <v-btn color="primary" v-if="folderId" icon target="_blank" :href="`https://drive.google.com/drive/folders/${folderId}`"> <v-icon>mdi-google-drive</v-icon> </v-btn>
            <v-btn color="primary" @click="getFiles()" icon>
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card flat  class="ma-4" v-if="files.length === 0 &&!loadingFiles ">
      <v-card-text>
        No files found in your Google Drive. When you add files either directly
        either through the file uploader they will appear here.
      </v-card-text>
    </v-card>
    <v-row v-masonry v-if="!loadingFiles">
      <v-col lg="3" v-for="(file,index) in files" :key="index">
        <v-card>
          <v-dialog max-width="90%">
            <template v-slot:activator="{ on, attrs }">
              <v-img :src="file.webContentLink" v-on="on" v-bind="attrs"
                     alt="google drive file"/>
            </template>
            <v-row no-gutters>
              <v-col lg="10">
                <v-img
                    style="background: #333"
                    max-height="900"
                    contain
                    :src="file.webContentLink">
                </v-img>
              </v-col>
              <v-col lg="2">
                <v-card class="fill-height">
                <v-card-title> {{file.name}} </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-dialog>
          <v-toolbar flat dense>
            <v-toolbar-title style="font-size:1em">
              {{ file.name }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon>
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


  </div>


</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
  name: "GoogleDriveFiles",
  data: () => ({
    file: null,
    files: [],
    loadingFiles: false,
  }),
  created() {
    this.getFiles()
  },
  computed:{
    ...mapState('jobs',[
      'folderId'
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
    getFiles() {
      this.loadingFiles = true
      return this.gdGetJobFiles()
          .then(files => {
            this.files = files
            this.loadingFiles = false
            this.repaint();
          })
    },
    addJobFile() {
      this.loadingFiles = true
      if (this.file !== null) {
        this.gdAddJobFile(this.file)
            .then(file => {
              console.log(file)
              this.files.unshift(file)
              this.repaint();
              this.loadingFiles = false;
              this.file = null;
            })

      }
    }
  }
}
</script>

<style scoped>

</style>
