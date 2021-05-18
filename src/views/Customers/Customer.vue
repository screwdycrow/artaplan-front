<template>
    <v-card flat>
        <v-toolbar flat>
            <v-toolbar-title>
                <strong> {{customer.name}} </strong>
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field v-model="customer.name" label="Name"></v-text-field>
                <v-text-field v-model="customer.email" label="Email"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" outlined @click="updateCustomer(customer)"> Update Customer</v-btn>
            <v-btn color="error" outlined @click="deleteCustomer(customer)"> Delete Customer and its jobs</v-btn>
        </v-card-actions>`
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
        created() {
            this.getCustomer(this.$route.params.id)
        },
        methods: {
            ...mapActions("customers", [
                'getCustomer',
                'updateCustomer',
                'deleteCustomer'
            ])
        },
        computed: {
            ...mapState("customers", [
                'customer'
            ])
        }
    }
</script>

<style scoped>

</style>