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
                    <button class="navbar-toggler" type="button" @click="toogleMenu"><img src="~@/assets/img/btn-menu.jpg" alt="btn menu" /></button>
                    <div :class="{'show': showMenu}" class="collapse navbar-collapse" id="navbarNav">
                        <i class="fa fa-times close" @click="toogleMenu"></i>
                        <div class="bg-over-lay"></div>
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <router-link :to="{name: 'Home'}" :class="{'active': isHome}" class="nav-link">Home -<span class="sr-only">(current)</span></router-link>
                            </li>
                            <li class="nav-item">
                                <router-link v-if="!showMenu" :to="{name: 'Category'}" :class="{'active': isMenu}" class="nav-link dropdown-toggle" @click="toogleMenuMenu">Menu -</router-link>
                                <a v-else="" :class="{'active': isMenu}" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" @click="toogleMenuMenu">Menu -</a>
                                <ul :class="{'show': showMenu && showMenuMenu}" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li class="nav-item">
                                        <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh A</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh B</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <router-link v-if="!showMenu" :to="{name: 'Category'}" :class="{'active': isRecipe}" class="nav-link dropdown-toggle" @click="toogleMenuMenu">Recipe -</router-link>
                                <a v-else="" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" @click="toogleMenuRecipe">Recipe -</a>
                                <ul :class="{'show': showMenu && showMenuRecipe}" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li class="nav-item">
                                        <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh A</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh B</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact us -</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="logo">
                    <!-- <router-link :to="{name: 'Home'}" class="hidden-sm-down">
                        <img class="img-fluid" src="~@/assets/img/logo.png" />
                    </router-link>
                    <router-link :to="{name: 'Home'}" class="hidden-md-up">
                        <img class="img-fluid" src="~@/assets/img/logo-mobile.png" />
                    </router-link> -->
                    <a class="hidden-sm-down" href="#"><img class="img-fluid" src="~@/assets/img/logo.png" /></a>
                    <a class="hidden-md-up" href="#"><img class="img-fluid" src="~@/assets/img/logo-mobile.jpg" /></a>
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
export default {
    name: 'Header',
    props: {
        isHome: {
            type: Boolean,
            defaul: false,
        },
        isMenu: {
            type: Boolean,
            defaul: false,
        },
        isRecipe: {
            type: Boolean,
            defaul: false,
        }
    },
    data() {
        return {
            showMenu: false,
            showMenuMenu: false,
            showMenuRecipe: false
        }
    },
    methods: {
        toogleMenu() {
            this.showMenu = !this.showMenu;
        },
        toogleMenuMenu() {
            this.showMenuMenu = !this.showMenuMenu;
        },
        toogleMenuRecipe() {
            this.showMenuRecipe = !this.showMenuRecipe;
        }
    },
}
</script>
