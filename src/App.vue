<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app id="inspire">
    <ui-messages></ui-messages>
    <time-logs></time-logs>

    <sidebar v-if="!$route.meta.noMenu" :show="drawerRight" :opened="opened"/>
    <v-app-bar
        class="hidden-md-and-up"
        color="background"
        flat app
    >
      <v-progress-linear v-if="isLoading" absolute top indeterminate striped height="10"></v-progress-linear>

      <v-container fluid class="d-flex align-center app-container">

        <v-app-bar-nav-icon @click.stop="opened = !opened"/>
        <v-toolbar-title>
          <strong class="heading hidden-md-and-up font-weight-black">
            <portal-target name="toolbar-title"/>
          </strong>
        </v-toolbar-title>
        <v-toolbar-items>
          <portal-target name="toolbar-items"/>
        </v-toolbar-items>
        <v-spacer/>
      </v-container>
    </v-app-bar>

    <v-app-bar
        class="hidden-sm-and-down"
        height="100"
        color="background" hide-on-scroll
        flat app
    >
      <v-progress-linear v-if="isLoading" absolute top indeterminate striped height="10"></v-progress-linear>

      <v-container  class="d-flex align-center app-container">
        <v-toolbar-title>
          <h1 class=" font-weight-black">
            <portal-target name="toolbar-title"/>
          </h1>
        </v-toolbar-title>
        <v-toolbar-items>
          <portal-target name="toolbar-items"/>
        </v-toolbar-items>
        <v-spacer/>
        <portal-target name="toolbar-actions"/>

      </v-container>
    </v-app-bar>
    <v-content class="background">
      <v-container

          class="pt-2 app-container"
      >
        <router-view/>
      </v-container>
    </v-content>
    <v-footer class="background">
      <v-card
          flat
          tile
          width="100%"
          class="transparent lighten-1 text-center"
      >
        <v-card-text>
          <v-btn
              color="grey"
              class="mx-4"
              text
              to="mailto:jimmyst@hotmail.gr"
          >
            Contact Us
          </v-btn>
          <v-btn
              color="grey"
              class="mx-4"
              text
              to="https://github.com/screwdycrow"
          >
            Github
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="grey--text">
          {{ new Date().getFullYear() }} — <strong>Artaplan</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <training-session></training-session>
    <time-log-now></time-log-now>

  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import {mapGetters, mapMutations, mapState} from "vuex";
import UiMessages from "@/components/UiMessages";
import TimeLogNow from "@/components/TimeLogs/TimeLogNow";
import TimeLogs from "@/components/TimeLogs/TimeLogs";
import TrainingSession from "@/views/Jobs/components/TrainingSession";

export default {
  name: 'App',

  components: {TrainingSession, TimeLogs, TimeLogNow, UiMessages, Sidebar},
  computed: {
    ...mapState([
      "isLoading"
    ]),
    ...mapGetters([
      "settings"
    ]),
    ...mapState('users', [
      'activeUser'
    ])
  },
  mounted() {
    this.$vuetify.theme.dark = this.settings.darkMode;
  },
  watch: {
    settings: {
      handler() {
        this.$vuetify.theme.dark = this.settings.darkMode;
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('timeLogs', [
      'toggleShowTimeLog'
    ])
  },
  data: () => ({
    drawerRight: true,
    opened: true,
    //
  }),
};
</script>

<style scoped>

@media only screen and (min-width: 1000px) {

  .app-container {
    max-width: 1600px;
  }
}

@media only screen and ( min-width: 2000px) {
  .app-container {
    max-width: 2000px;
  }
}

.topbar .v-toolbar__content {
  max-width: 1700px !important;
}
</style>
