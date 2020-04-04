<template>
  <div class="mb-5 mr-5 ml-5">
    <b-navbar class="m-auto">
      <b-navbar-nav style="font-size: 1.25em">

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Home" left>
          <b-dropdown-item @click="onClick('slide')">Slide</b-dropdown-item>
          <b-dropdown-item  @click="onClick('content')">Content</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="User" left>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item right @click="signOut" class="cursor-point right">Sign-out</b-nav-item>
      </b-navbar-nav>

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
