<template>
  <v-row>
    <portal to="toolbar-title"> Customers </portal>
    <portal to="toolbar-actions"> <v-btn color="primary" to="/newCustomer"> <v-icon> mdi-plus </v-icon> Customer</v-btn> </portal>
    <v-col lg="4">
      <v-card  class="fill-height" flat>
        <v-card-title><strong> Customers </strong></v-card-title>
        <v-list color="transparent">
          <v-list-item :to="'/customers/'+customer.customerId"
                       v-for="(customer) in customers">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> {{ customer.name }}</v-list-item-title>
              <v-list-item-subtitle> {{ customer.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col lg="8">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex"

export default {
  name: "Customers",
  created() {
    this.getAllCustomers();
  },
  methods: {
    ...mapActions("customers", [
      "getAllCustomers"
    ])
  },
  computed: {
    ...mapGetters("customers", [
      "customers"
    ])
  }
}
</script>

<style scoped>

</style>