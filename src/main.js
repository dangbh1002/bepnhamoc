// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFirestore from 'vue-firestore'
import Meta from 'vue-meta'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Vue.use(VueFirestore, {
//     key: 'id' // the name of the property. Default is '.key'.
// })

require('./assets/css/style.css')
require('./assets/css/admin.css')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFirestore)
Vue.use(Meta)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
