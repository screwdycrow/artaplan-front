import slotApi from "@/api/slots";
import customers from "@/api/customers";
import Customer from "@/classes/Customer";
import Messages  from "@/store/Messages";

export default ({
    namespaced: true,
    state: {
        customers: []
    },
    actions: {
        getAllCustomers({commit}) {
            return customers.getCustomers().then(
                customers => {
                    commit("setCustomers", customers);
                    return Promise.resolve(customers);
                }
            );
        },
        addCustomer({commit}, customer) {
            commit('setLoading', true, {root: true})
            return customers.addCustomer(customer).then(resp => {
                commit('pushMessage', {type: 'success', text: Messages.CUSTOMER_ADDED}, {root: true})
                commit('setLoading', false, {root: true})
                return Promise.resolve(resp)
            })
        }

    },
    mutations: {
        setCustomers(state, customers) {
            state.customers = customers.map(c => new Customer(c))
        }
    },
});
