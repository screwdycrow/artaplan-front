<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app id="inspire">
    <v-progress-linear v-if="isLoading"  absolute bottom   indeterminate striped height="10" ></v-progress-linear>

    <ui-messages></ui-messages>
    <sidebar v-if="!$route.meta.noMenu" :show="drawerRight"  :opened="opened"/>
    <v-app-bar
        class="hidden-md-and-up"
        color="background"
        collapse-on-scroll
        flat app

    >
      <v-container style="max-width: 1600px" class="d-flex align-center">
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
        class="hidden-sm-and-down pt-2"
        color="background"
        collapse-on-scroll
        flat app
    >
      <v-container style="max-width: 1600px" class="d-flex align-center">
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
          class="pt-2 "
          style="max-width: 1600px"
      >
        <v-btn
            fixed
            color="primary"
            dark
            bottom
            right
            fab
        >
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import {mapState} from "vuex";
import UiMessages from "@/components/UiMessages";

export default {
  name: 'App',

  components: {UiMessages, Sidebar},
  computed:{
    ...mapState([
       "isLoading"
    ]),
    ...mapState('users',[
        'activeUser'
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
.topbar .v-toolbar__content {
  max-width: 1700px !important;
}
</style>
