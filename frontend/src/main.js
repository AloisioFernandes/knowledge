import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFsb8Otc2lvIEZlcm5hbmRlcyBHLiIsImVtYWlsIjoiYWxvaXNpby5mZXJuYW5kZXNAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxMjEwOTkxMywiZXhwIjoxNjEyMzY5MTEzfQ.AC1sDa6iKg5-l8ei0IjNvvjW87JKPGzVwXpxHLrGP38'

new Vue({
  store, // store pode ser compartilhada entre os componentes
  router,
  render: h => h(App)
}).$mount('#app')