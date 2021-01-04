import axios from '@/api/axios'
import Customer from "@/classes/Customer";

export default {
    getCustomers() {
      return  axios.get('/customers')
          .then(resp=>resp.data)
    }
}

