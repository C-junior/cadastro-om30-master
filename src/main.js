import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { makeServer } from "./server"
import VueTheMask from 'vue-the-mask'

// Vue.config.productionTip = false

if (process.env.NODE_ENV === "development") {
  makeServer()
}

import './assets/main.css'

const app = createApp(App)

app.use(VueTheMask)

app.use(router)

app.mount('#app')
