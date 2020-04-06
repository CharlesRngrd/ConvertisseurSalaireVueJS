import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import LayoutPlugin  from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import translation from './translation.json'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faExclamationCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestionCircle, faExclamationCircle, faPlusCircle)

Vue.use(VueRouter)
Vue.use(LayoutPlugin)
Vue.use(VueI18n)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
})

const messages = translation

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages
})

new Vue({
  i18n,
  el: '#app',
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')
