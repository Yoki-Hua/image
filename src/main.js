import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";
import axios from "axios";
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(moment);
Vue.prototype.$http = axios;
new Vue({
  render: h => h(App),
}).$mount('#app')
