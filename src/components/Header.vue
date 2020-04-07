<template>
<header>
    <div class="header">
        <div class="row">
            <div class="col-md-2 col-sm-2 col-col-3">
                <ul class="hd-lang">
                    <li><img class="img-fluid" src="~@/assets/img/vn-lang.png" /></li>
                </ul>
            </div>
            <div class="col-md-8 col-sm-8 col-xs-3">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" @click="toogleMenu"><img src="~@/assets/img/btn-menu.png" alt="btn menu" class="btn-menu" /></button>
                    <div :class="{'show': showMenu}" class="collapse navbar-collapse" id="navbarNav">
                        <i class="fa fa-times close" @click="toogleMenu"></i>
                        <div class="bg-over-lay"></div>
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <router-link :to="{name: 'Home'}" :class="{'active': isHome}" class="nav-link">Home -<span class="sr-only">(current)</span></router-link>
                            </li>
                            <li class="nav-item">
                                <router-link v-if="!showMenu" :to="{name: 'Menu'}" :class="{'active': isMenu}" class="nav-link dropdown-toggle" @click="toogleMenuMenu">Menu -</router-link>
                                <a v-else="" :class="{'active': isMenu}" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" @click="toogleMenuMenu">Menu -</a>
                                <ul :class="{'show': showMenu && showMenuMenu}" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <div v-for="(item, index) in list" :key="index">
                                    <template v-if="Object.keys(item.child).length">
                                      <li v-for="(id, k) in Object.keys(item.child)" :key="k" class="nav-item">
                                          <router-link :to="{name: 'MenuDetail', params: {id}}" class="dropdown-item">
                                            {{ item.child[id] }}
                                          </router-link>
                                      </li>
                                    </template>
                                  </div>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <router-link v-if="!showMenu" :to="{name: 'Recipe'}" :class="{'active': isRecipe}" class="nav-link dropdown-toggle" @click="toogleMenuMenu">Recipe -</router-link>
                                <a v-else="" class="nav-link dropdown-toggle" role="button" @click="toogleMenuRecipe">Recipe -</a>
                                <ul :class="{'show': showMenu && showMenuRecipe}" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <div v-for="(item, index) in list" :key="index">
                                    <template v-if="Object.keys(item.child).length">
                                      <li v-for="(id, k) in Object.keys(item.child)" :key="k" class="nav-item">
                                        <router-link :to="{name: 'RecipeDetail', params: {id}}" class="dropdown-item">
                                          {{ item.child[id] }}
                                        </router-link>
                                      </li>
                                    </template>
                                  </div>
                                </ul>
                            </li>
                            <li class="nav-item">
                              <router-link :to="{name: 'Contact'}" :class="{'active': isContact}" class="nav-link" >Contact us -</router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="logo">
                    <a class="hidden-sm-down" href="/"><img class="img-fluid" src="~@/assets/img/logo.png" /></a>
                    <a class="hidden-md-up" href="/"><img class="img-fluid" src="~@/assets/img/logo-mobile.jpg" /></a>
                </div>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-6">
                <form>
                    <input value="" type="text" placeholder="Tìm kiếm..." />
                    <button><img class="img-fluid" src="~@/assets/img/btn-search.jpg" /></button>
                </form>
            </div>
        </div>
    </div>
</header>
</template>

<script>
import {db} from '@/config/firebase'
export default {
    name: 'Header',
    props: {
        isHome: {
            type: Boolean,
            defaul: false
        },
        isMenu: {
            type: Boolean,
            defaul: false
        },
        isRecipe: {
            type: Boolean,
            defaul: false
        },
        isContact: {
            type: Boolean,
            defaul: false
        }
    },
    data () {
        return {
            showMenu: false,
            showMenuMenu: false,
            showMenuRecipe: false,
            list: []
        }
    },
    firestore () {
        return {
            list: db.collection('menu')
        }
    },
    methods: {
        toogleMenu () {
            this.showMenu = !this.showMenu
        },
        toogleMenuMenu () {
            this.showMenuMenu = !this.showMenuMenu
        },
        toogleMenuRecipe () {
            this.showMenuRecipe = !this.showMenuRecipe
        }
    }
}
</script>
