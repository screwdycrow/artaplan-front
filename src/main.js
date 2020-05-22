import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import PortalVue from 'portal-vue'
import  moment from "moment";
Vue.config.productionTip = false;
Vue.use(PortalVue);

Vue.filter('formatDate', function (value) {
  if (!value) return '';
  value = value.toString();
  return moment(value).format('DD/MM/YY')
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

