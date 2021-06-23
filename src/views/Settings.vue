<template>
  <v-row>
    <portal to="toolbar-title"> Settings</portal>
    <v-col lg="8">
      <v-card flat>
        <v-toolbar flat>
          <v-toolbar-title>
            <strong> Change Password </strong>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field :rules="passwordRules" v-model="password" type="password" label="New Password">
            </v-text-field>
            <v-text-field :rules="repeatPasswordRules" v-model="repeatPassword" type="password"
                          label="Repeat new Password">
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" :disabled="!valid" outlined @click="changePasswordClick(password)"> Change</v-btn>
        </v-card-actions>
      </v-card>
      <v-card flat class="mt-4">
        <v-toolbar dense flat>
          <v-toolbar-title>
            <strong> User Preferences </strong>
          </v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-btn
                @click="getNotificationPermission()"
            > Grant Notifications Permission
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
                @click="googleAuth()"
            > Login To Google Drive
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
                @click="getArtaplanFolder()"
            > Check Artaplan Folder
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-brightness</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-switch label="Toggle dark mode UI (Experimental)" v-model="settings.darkMode"
                        @change="saveSettings()"></v-switch>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import gdFiles from "@/api/gdFiles";

export default {
  name: "Settings",
  data: () => ({
    valid: false,
    notifications: false,
    repeatPasswordRules: [
      v => v === this.password || 'Password does not match'
    ],
    passwordRules: [
      v => !!v || 'Password Is Required... like obviously?',
      v => /(?=.*[0-9])/.test(v) || 'password must contain at least a number',
      v => /(?=.*[A-Z])/.test(v) || 'password must contain at least one Uppercase Letter ',
      v => /(?=.*[a-z])/.test(v) || 'password must contain at least one lowercase Letter ',
    ],
    password: null,
    repeatPassword: null
  }),
  computed: {
    ...mapGetters([
      "settings"
    ])
  },
  methods: {
    createArtaplanFolder() {
      this.$gapi.getGapiClient()
          .then(gapi => gdFiles.createMainFolder(gapi))
    },
    getArtaplanFolder() {
      this.gdGetArtaplanFolder().then(id => alert(id))
    },
    googleAuth() {
      this.$gapi.login().then(({currentUser, hasGrantedScopes}) => {
        console.log({currentUser, hasGrantedScopes})
      })
    },
    getNotificationPermission() {
      Notification
          .requestPermission()
          .then(permission => {
            if (permission === "granted") {
              this.notifications = true
              this.notify('You are now allowing notifications for this web page')
            } else if (permission === "denied") {
              alert('You have disabled notifications for this web page. Please re-enable them through the browser settings. ')
            }
          }).catch(e => {
      });
    },
    changePasswordClick() {
      if (confirm('Are you sure about this? You will need to re-login.'))
        this.changePassword(this.password)
            .then(resp => {
              this.logout()
            })
    },
    ...mapActions([
      "gdGetArtaplanFolder",
      "saveSettings",
      "notify",
      'changePassword',
      'logout'
    ])
  }
}
</script>

<style scoped>

</style>
