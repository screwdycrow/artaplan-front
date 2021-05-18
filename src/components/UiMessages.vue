<template>
  <div>
    <v-snackbar
        v-for="(message,index) in activeMessages"
        :key="index"
        v-model="message.active"
        bottom
        :color="message.type"
        :timeout="4000"
    >
      <v-btn dark text @click="message.active = false"><v-icon>mdi-delete</v-icon></v-btn>
      {{ message.text }}
      <v-spacer></v-spacer>
    </v-snackbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
name: "UiMessages",
  computed:{
    ...mapMutations([
       "pushMessage",
       "removeMessage"
    ]),
    ...mapGetters([
        "activeMessages"
    ])
  }
}
</script>

<style scoped>

</style>
