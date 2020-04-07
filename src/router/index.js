import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Menu from '@/views/Menu'
import Recipe from '@/views/Recipe'
import Detail from '@/views/Detail'
import Contact from '@/views/ContactUs'
import Admin from '@/views/Admin'
// import Test from '@/views/Test'
import Login from '@/views/Login'

import {auth} from '@/config/firebase'

Vue.use(Router)

const router = new Router({
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
            path: '/menu/:id',
            name: 'MenuDetail',
            component: Menu
        },
        {
            path: '/recipe',
            name: 'Recipe',
            component: Recipe
        },
        {
            path: '/recipe/:id',
            name: 'RecipeDetail',
            component: Recipe
        },
        {
            path: '/menu/:type/:id',
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
            component: Admin,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})
router.beforeEach((to, from, next) => {
    const currentUser = auth.currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) {
        next('login')
    } else {
        next()
    }
})

export default router
