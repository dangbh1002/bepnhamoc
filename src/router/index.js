import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Menu from '@/views/Menu'
import Recipe from '@/views/Recipe'
import Detail from '@/views/Detail'
import Contact from '@/views/ContactUs'
import Admin from '@/views/admin/Admin'
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
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                isHome: true
            }
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu,
            meta: {
                isMenu: true
            }
        },
        {
            path: '/menu/:id',
            name: 'MenuDetail',
            component: Menu,
            meta: {
                isMenu: true
            }
        },
        {
            path: '/menu/:type/:id',
            name: 'MenuPostDetail',
            component: Detail,
            meta: {
                isMenu: true
            }
        },
        {
            path: '/recipe',
            name: 'Recipe',
            component: Recipe,
            meta: {
                isRecipe: true
            }
        },
        {
            path: '/recipe/:id',
            name: 'RecipeDetail',
            component: Recipe,
            meta: {
                isRecipe: true
            }
        },
        {
            path: '/recipe/:type/:id',
            name: 'RecipePostDetail',
            component: Detail,
            meta: {
                isRecipe: true
            }
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: {
                isContact: true
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                isAdmin: true
            },
            children: [
                {
                    path: 'slide',
                    name: 'Slide',
                    component: AdminSlide,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path: 'content',
                    name: 'Content',
                    component: AdminContent,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path: 'menu-left',
                    name: 'AdminMenu',
                    component: AdminMenu,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path: 'contact',
                    name: 'AdminContact',
                    component: AdminContact,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path: 'menu/category/:id',
                    name: 'AdminMenuCategory',
                    component: AdminMenuCategory,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path: 'menu/post/:id',
                    name: 'AdminMenuPost',
                    component: AdminMenuPost,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path: 'menu/recipe/:id',
                    name: 'AdminRecipe',
                    component: AdminRecipe,
                    meta: {
                        isAdmin: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                isAdmin: true
            }
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

Vue.use(VueAnalytics, {
    id: 'UA-161644222-1',
    // disableScriptLoader: true,
    router,
    prependBase: false,
    ignoreRoutes: ['/admin', '/admin/*', 'login']
})

export default router
