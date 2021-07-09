<template>
  <v-btn
      @click="googleAuth()"
  > Login To Google Drive
  </v-btn>
</template>

<script>
export default {
  name: "GoogleButton",
  methods: {
    googleAuth() {
      this.$gapi.login().then(({currentUser, hasGrantedScopes}) => {
        console.log({currentUser, hasGrantedScopes})
      })
    },
  }
}
</script>

<style scoped>

</style>
