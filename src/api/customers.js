import axios from '@/api/axios'
import Customer from "@/classes/Customer";

export default {
    getCustomers() {
      return  axios.get('/customers')
          .then(resp=>resp.data)
    },
    addCustomer(customer){
        let _customer = (customer instanceof Customer)?customer:new Customer(customer)
        return axios.post('/customers',_customer)
    }
}

