<template>
  <div>
    <h1> ARTAPLAN </h1>
    <v-card  dark color="secondary" class="pa-0" flat>
      <v-row >
        <v-col lg="4" md="6" sm="12"  class="pa-5">
          <v-card-title> <span class="text--white"> Register Now </span> </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field  label="Username" v-model="username"></v-text-field>
              <v-text-field  label="Email" v-model="email"></v-text-field>
              <v-text-field  label="Password" v-model="password"></v-text-field>
              <v-text-field  label="Repeat Password" v-model="repeatPassword"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>

            <v-btn color="primary" @click="registerUser()">
              Εγγραφή
            </v-btn>
          </v-card-actions>
        </v-col>
        <v-col lg="8" md="6" sm="12" class="white">
          <v-img
              width="100%"
              src="https://www.paymentsjournal.com/wp-content/uploads/2020/09/forgot-password-concept-illustration_114360-1123-626x375.jpg"
          />
        </v-col>
      </v-row>

    </v-card>


  </div>
</template>

<script>
import api from '../api';
import User from "@/classes/User";

export default {
  name: "Registration",
  data: () => ({
    username: null,
    email: null,
    password: null,
    repeatPassword: null
  }),
  methods: {
    registerUser() {
      let user = new User({
        username: this.username,
        email: this.email,
      })
      api.users.registerUser(user, this.password).then(resp => {
        alert(resp.data)
      })

    }
  }
}
</script>

<style scoped>

</style>
