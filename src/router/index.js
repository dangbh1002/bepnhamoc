import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Menu from '@/views/Menu'
import Recipe from '@/views/Recipe'
import Detail from '@/views/Detail'
import Contact from '@/views/ContactUs'
import Admin from '@/views/Admin'
import AdminSlide from '@/views/admin/Slide'
import AdminContent from '@/views/admin/Content'
import AdminMenu from '@/views/admin/MenuLeft'
import AdminMenuCategory from '@/views/admin/menu/MenuCategory'
import AdminMenuPost from '@/views/admin/menu/MenuPost'
import AdminContact from '@/views/admin/Contact'
import AdminRecipe from '@/views/admin/Recipe'
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
            path: '/menu/:type/:id',
            name: 'MenuPostDetail',
            component: Detail
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
            path: '/recipe/:type/:id',
            name: 'RecipePostDetail',
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
            },
            children: [
                {
                    path: 'slide',
                    name: 'Slide',
                    component: AdminSlide
                },
                {
                    path: 'content',
                    name: 'Content',
                    component: AdminContent
                },
                {
                    path: 'menu-left',
                    name: 'AdminMenu',
                    component: AdminMenu
                },
                {
                    path: 'contact',
                    name: 'AdminContact',
                    component: AdminContact
                },
                {
                    path: 'menu/category/:id',
                    name: 'AdminMenuCategory',
                    component: AdminMenuCategory
                },
                {
                    path: 'menu/post/:id',
                    name: 'AdminMenuPost',
                    component: AdminMenuPost
                },
                {
                    path: 'menu/recipe/:id',
                    name: 'AdminRecipe',
                    component: AdminRecipe
                }
            ]
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
