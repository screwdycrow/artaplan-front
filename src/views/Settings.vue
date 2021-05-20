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
        `
      </v-card>

    </v-col>
  </v-row>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Settings",
  data: () => ({
    valid: false,
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
  methods: {
    changePasswordClick() {
      if(confirm('Are you sure about this? You will need to re-login.'))
      this.changePassword(this.password)
          .then(resp=>{
            this.logout()
          })
    },
    ...mapActions([
      'changePassword',
      'logout'
    ])
  }
}
</script>

<style scoped>

</style>
