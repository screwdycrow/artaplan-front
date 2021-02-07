import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import PortalVue from 'portal-vue'
import  moment from "moment";
import VueApexCharts from 'vue-apexcharts'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false;
Vue.use(PortalVue);
Vue.component('apexchart', VueApexCharts);

Vue.filter('formatDate', function (value) {
  if (!value) return '';
  value = value.toString();
  return moment(value).format('DD/MM/YY')
});

Vue.filter('fixed',function(value){
  return Number(value).toFixed(0);
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

