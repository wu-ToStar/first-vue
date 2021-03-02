import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
Vue.use(toast)

import FastClick from "fastclick"
FastClick.attach(document.body)

import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad, {
  loading:require('assets/img/common/load.gif')
})

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
