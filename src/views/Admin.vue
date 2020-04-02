<template>
  <div class="mb-5 mr-5 ml-5">
    <b-navbar class="m-auto">
      <b-navbar-brand :class="{active: menu.slide}" class="cursor-point" @click="onClick('slide')">Home/Slide</b-navbar-brand>
      <b-navbar-brand :class="{active: menu.content}" class="cursor-point" @click="onClick('content')">Home/Content</b-navbar-brand>

      <b-navbar-brand right class="cursor-point right" @click="signOut">Sign-out</b-navbar-brand>
    </b-navbar>

    <slide v-if="menu.slide"/>

    <home-content v-if="menu.content"/>

  </div>

</template>

<script>
import {auth} from '@/config/firebase'
import Slide from '@/components/admin/Slide'
import HomeContent from '@/components/admin/Content'
export default {
    name: 'Admin',
    components: {
        Slide,
        HomeContent
    },
    data () {
        return {
            menu: {slide: true}
        }
    },
    methods: {
        onClick (value) {
            this.menu = {}
            this.menu[value] = true
        },
        signOut () {
            auth
                .signOut()
                .then(() => {
                    this.$router.replace({
                        name: 'Login'
                    })
                })
        }
    }
}
</script>

<style scoped>
  .cursor-point {
    cursor: pointer;
  }
  .cursor-point:hover,  .cursor-point.active{
    color: #f6921e;
  }
  .cursor-point.right{
    position: absolute;
    right: 0;
  }
  input[type=file] {
    position: relative !important;
}
</style>
