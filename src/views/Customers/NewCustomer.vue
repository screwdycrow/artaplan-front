<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title >
        <strong> {{customer.name}} </strong>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field  v-model="customer.name" label="Name"></v-text-field>
        <v-text-field v-model="customer.email" label="Email"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit()"> Add Customer </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "NewCustomer",
  data:()=>({
    customer:{
      name:"",
      email:""
    }
  }),
  methods:{
    ...mapActions('customers',[
            "addCustomer"
    ]),

    submit(){
      this.addCustomer(this.customer).then(resp=>{
        this.$router.push('/customers')
      })
    }

  }

}
</script>

<style scoped>

</style>