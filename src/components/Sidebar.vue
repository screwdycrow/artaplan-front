<template>
  <v-navigation-drawer
      tile
      color="secondary"
      permanent
      app
      dark
      touchless
      left
        v-model="opened"
      expand-on-hover
  >
    <v-toolbar class="pt-4" extended extension-height="30" color="transparent" dark flat>
      <v-app-bar-nav-icon class="" color="">
        <v-img width="50px" contain src="@/assets/Artboard2.png"></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <h1 class="headline"> ARTAPLAN</h1>
      </v-toolbar-title>
    </v-toolbar>
    <div>
      <v-list class="primary--text text--lighten-2">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon> mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/slots">
          <v-list-item-icon>
            <v-icon> mdi-brush</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Job Templates
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/jobs">
          <v-list-item-icon>
            <v-icon> mdi-briefcase</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Jobs
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/customers">
          <v-list-item-icon>
            <v-icon> mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Customers
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/schedule">
          <v-list-item-icon>
            <v-icon> mdi-calendar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Schedule
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toggleShowTimeLog()">
          <v-list-item-icon>
            <v-icon> mdi-clock</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Time Log
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-5"  to="/settings">
          <v-list-item-icon>
            <v-icon> mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Settings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logoutClick()">
          <v-list-item-icon>
            <v-icon> mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapMutations} from "vuex"

export default {
  name: "Sidebar",
  props: {show: Boolean, opened: Boolean},
  methods: {
    ...mapActions([
      'logout'
    ]),
    ...mapMutations('timeLogs',[
        'toggleShowTimeLog'
    ]),
    logoutClick() {
      this.logout().then(() => {
        this.$router.push('/login');
      })
    }
  }
}
</script>

<style scoped>

</style>
