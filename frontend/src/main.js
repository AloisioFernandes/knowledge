import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywibmFtZSI6Ikpvw6NvIiwiZW1haWwiOiJqb2FvQGdtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjEyMDQwOTY2LCJleHAiOjE2MTIzMDAxNjZ9.g_0Tvmonaj94ZKcZ2_c1idTEfq0yvBwhKj82VIzuRO4'

new Vue({
  store, // store pode ser compartilhada entre os componentes
  router,
  render: h => h(App)
}).$mount('#app')