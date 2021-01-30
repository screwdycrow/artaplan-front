import slotApi from "@/api/slots";
import customers from "@/api/customers";
import  Customer from "@/classes/Customer";
import Messages  from "@/store/Messages";

export default ({
    namespaced: true,
    state: {
        customers: [],
        customer:{}
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
        getCustomer({commit},id){
            commit('setLoading', true, {root: true})
            return customers.getCustomer(id).then(resp => {
                commit("setCustomer", resp);
                commit('setLoading', false, {root: true})
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
        }
    },
    mutations: {
        setCustomer(state, customer){
            state.customer = new Customer(customer);
        },
        setCustomers(state, customers) {
            state.customers = customers.map(c => new Customer(c))
        }
    },
});
