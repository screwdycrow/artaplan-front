import slotApi from "@/api/slots";
import customers from "@/api/customers";
import Customer from "@/classes/Customer";

export default ({
    namespaced: true,
    state: {
        customers: []
    },
    actions: {
        getAllCustomers({commit}) {
            return customers.getCustomers().then(
                resp => {
                    commit("setCustomers", resp);
                    return Promise.resolve(resp);
                }
            );
        }
    },
    mutations: {
        setCustomers(state, customers) {
            state.customers = customers.map(c => new Customer(c))
        }

    },
    getters: {},
});
