// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFirestore from 'vue-firestore'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import CKEditor from '@ckeditor/ckeditor5-vue';

require('./assets/css/style.css')
require('./assets/js/style.js')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFirestore)
Vue.use(CKEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
