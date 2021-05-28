import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify';
import PortalVue from 'portal-vue'
import  moment from "moment";
import VueApexCharts from 'vue-apexcharts'
import customcss from "./assets/custom.css"
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
import CKEditor from 'ckeditor4-vue';
import { VueMasonryPlugin } from "vue-masonry";


Vue.config.productionTip = false;
Vue.use( CKEditor );
Vue.use(PortalVue);
Vue.use(VueMasonryPlugin);

Vue.component('apexchart', VueApexCharts);

Vue.filter('formatDate', function (value,format) {
  if (!value) return '';
  if(!format) format = 'DD/MM/YY'
  value = value.toString();
  return moment(value).format(format)
});

Vue.filter('fixed',function(value, digits){
  let fractionDigits = digits === undefined?0:digits
  return Number(value).toFixed(fractionDigits);
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

