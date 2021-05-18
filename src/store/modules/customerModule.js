import slotApi from "@/api/slots";
import customers from "@/api/customers";
import Customer from "@/classes/Customer";
import Messages from "@/store/Messages";
import Vue from 'vue'

export default ({
    namespaced: true,
    state: {
        customers: [],
        customer: {}
    },
    getters: {
        customers: s => s.customers
    },
    actions: {
        getAllCustomers({commit}) {
            commit('setLoading', true, {root: true})
            return customers.getCustomers().then(
                customers => {
                    commit("setCustomers", customers);
                    commit('setLoading', false, {root: true})
                    return Promise.resolve(customers);
                }
            );
        },
        getCustomer({commit}, id) {
            commit('setLoading', true, {root: true})
            return customers.getCustomer(id).then(resp => {
                commit("setCustomer", resp);
                commit('setLoading', false, {root: true})
                return Promise.resolve(new Customer(resp))
            })
        },
        updateCustomer({commit}, customer) {
            return customers.putCustomer(customer).then(resp => {
                commit('pushMessage', {type: 'success', text: 'updated'}, {root: true})
                commit('setLoading', false, {root: true})
                commit('setCustomer', resp)
                return Promise.resolve(new Customer(resp))
            })
        },
        addCustomer({commit}, customer) {
            commit('setLoading', true, {root: true})
            return customers.addCustomer(customer).then(resp => {
                commit('pushMessage', {type: 'success', text: Messages.CUSTOMER_ADDED}, {root: true})
                commit('setLoading', false, {root: true})
                return Promise.resolve(new Customer(resp))
            })
        },
        deleteCustomer({commit}, customer) {
            if (confirm('Deleting a customer will also delete all of its jobs. Are you sure?')) {
                commit('setLoading', true, {root: true})
                return customers.deleteCustomer(customer).then(resp => {
                    commit("removeCustomer", customer);
                    commit('setLoading', false, {root: true})
                })
            }
        }
    },
    mutations: {

        setCustomer(state, customer) {
            state.customer = new Customer(customer);
            let index = state.customers.findIndex(c => c.customerId === customer.customerId)
            if (index !== -1) {
                Vue.set(state.customers, index, state.customer)
            } else {
                state.customers.push(customer)
            }
        },
        removeCustomer(state, customer) {
            let index = state.customers.findIndex(c => c.customerId === customer.customerId)
            if (index !== -1) {
                state.customers.splice(index, 1);
                state.customer = {};
            }
        },
        setCustomers(state, customers) {
            state.customers = customers.map(c => new Customer(c))
        }
    },
});
