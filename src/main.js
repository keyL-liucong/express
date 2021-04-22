import Vue from 'vue'
import App from './App'
import { alter, toast } from './utils/index';
import navTo from './utils/navTo';

Vue.prototype.$alert = alter;
Vue.prototype.$toast = toast;
Vue.prototype.$page = navTo;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()