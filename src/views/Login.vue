<template>
  <div>
    <h1> ARTAPLAN </h1>
    <v-card dark color="secondary" class="pa-0" flat>
      <v-row>
        <v-col lg="4" md="6" sm="12" class="pa-5">
          <v-card-title><span class="text--white"> Login </span></v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Username" v-model="username"></v-text-field>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>

            <v-btn color="primary" @click="login()">
              Login
            </v-btn>
            <v-btn to="/registration"> Register Now </v-btn>
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
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "Login",
  data: () => ({
    username: null,
    password: null
  }),
  methods: {
    ...mapActions([
      "authenticate"
    ]),
    ...mapMutations([
       "pushMessage",
       "setLoading"
    ]),
    login() {
      this.authenticate({
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      })
    }

  }
}
</script>

<style scoped>

</style>
