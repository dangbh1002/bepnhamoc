import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Category from '@/views/Category'
import Detail from '@/views/Detail'
import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/menu',
            name: 'Category',
            component: Category
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ]
})
