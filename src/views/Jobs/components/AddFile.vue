<template>
  <v-card>
    <v-card-text>
      <v-file-input v-model="file"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="addFileToGoogleDrive(file)" :disabled="file===null"> Add A File</v-btn>
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
      'addFileToGoogleDrive'
    ])
  }
}
</script>

<style scoped>

</style>