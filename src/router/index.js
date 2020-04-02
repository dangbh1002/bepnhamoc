import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Menu from '@/views/Menu'
import Recipe from '@/views/Recipe'
import Detail from '@/views/Detail'
import Contact from '@/views/ContactUs'
import Admin from '@/views/Admin'
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
            name: 'Menu',
            component: Menu
        },
        {
            path: '/recipe',
            name: 'Recipe',
            component: Recipe
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ]
})
