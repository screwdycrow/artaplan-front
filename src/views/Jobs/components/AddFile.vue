<template>
  <v-card>
    <v-card-text>
      <v-file-input v-model="file"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="gdAddJobFile(file)" :disabled="file===null"> Add A File</v-btn>
      <v-btn color="primary" @click="gdCreateJobFolder"> Create Job Folder</v-btn>
      <v-btn color="primary" @click="gdGetJobFolderId"> Get Job Folder</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "AddFile",
  data: () => ({
    file: null
  }),
  methods: {
    ...mapActions('jobs', [
      'gdAddJobFile',
      'gdGetJobFolderId',
      'gdCreateJobFolder'
    ])
  }
}
</script>

<style scoped>

</style>
