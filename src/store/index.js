import Vue from 'vue'
import Vuex from 'vuex'
import slotModule from "@/store/modules/slotModule";
import jobModule from "@/store/modules/jobModule";
import stageModule from "./modules/stageModule"
import scheduleModule from "@/store/modules/scheduleModule";
import customerModule from "@/store/modules/customerModule";
import userModule from "@/store/modules/userModule";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    schedule:scheduleModule,
    slots:slotModule,
    jobs:jobModule,
    stages:stageModule,
    customers:customerModule,
    users:userModule
  }
})
