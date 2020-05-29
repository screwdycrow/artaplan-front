const customers = [
    {
        customerId:1,
        name:'Wynslow',
        email:null,
        token:"12ifjdk4dkfdkfds"
    },
    {
        customerId:2,
        name:'Thomie Dimensor',
        email:null,
        token:"12ifjdk4dkfdkfsds"
    }
];
export default {
    getCustomers(){
        return Promise.resolve(customers)
    }
}

