<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title >
        <strong> {{customer.name}} </strong>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field v-model="customer.name" label="Name"></v-text-field>
        <v-text-field v-model="customer.email" label="Email"></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>


</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
  name: "Customer",
  watch: {
    $route(to, from) {
      this.getCustomer(this.$route.params.id).then(customer => {
      })
    }
  },
  methods:{
    ...mapActions("customers",[
        'getCustomer'
    ])
  },
  computed:{
    ...mapState("customers",[
        'customer'
    ])
  }
}
</script>

<style scoped>

</style>