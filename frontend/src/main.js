import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'

Vue.config.productionTip = false

new Vue({
  store, // store pode ser compartilhada entre os componentes
  render: h => h(App)
}).$mount('#app')