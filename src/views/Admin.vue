<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a>Bep nha moc</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Home</span>
              </li>

              <li>
                <router-link to="/admin/slide">
                  <i class="fa fa-circle"></i>
                  <span>Slide</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/content">
                  <i class="fa fa-circle"></i>
                  <span>Content</span>
                </router-link>
              </li>
            </ul>

            <hr style="border-color: #454545;">
            <ul>
              <li>
                <router-link to="/admin/menu-left">
                  <i class="fa fa-list-alt"></i>
                  <span>Menu Left</span>
                </router-link>
              </li>
              <li v-for="(item, index) in listByOrder" :key="index">
                <router-link :to="{name: 'AdminMenuCategory', params: {id: item['.key']}}">
                  <i class="fa fa-circle"></i>
                  <span>{{ item.name }}</span>
                </router-link>
              </li>
            </ul>

            <hr style="border-color: #454545;">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li v-for="(item, index) in listByOrder" :key="index">
                <div v-if="Object.keys(item.child).length">
                  <div v-for="(id, k) in Object.keys(item.child)" :key="k">
                    <router-link :to="{name: 'AdminMenuPost', params: {id, name: item.child[id]}}">
                      <i class="fa fa-circle"></i>
                      {{ item.child[id] }}
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>


            <hr style="border-color: #454545;">
            <ul>
              <li class="header-menu">
                <span>Recipe</span>
              </li>

              <!--<li v-for="(item, index) in listByOrder" :key="index">-->
                <!--<router-link :to="{name: 'AdminMenuCategory', params: {id: item['.key']}}">-->
                  <!--<i class="fa fa-circle"></i>-->
                  <!--<span>{{ item.name }}</span>-->
                <!--</router-link>-->
              <!--</li>-->
            </ul>

            <!--<hr style="border-color: #454545;">-->
            <!--<ul>-->
              <!--<li>-->
                <!--<router-link to="/admin/contact">-->
                  <!--<i class="fa fa-address-card"></i>-->
                  <!--<span>Contact</span>-->
                <!--</router-link>-->
              <!--</li>-->
            <!--</ul>-->

            <hr style="border-color: #454545;">
            <ul>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>

      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view/>
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->

  </div>
</template>

<script>
import {auth, db} from '@/config/firebase'
export default {
    name: 'Admin',
    firestore () {
        return {
            list: db.collection('menu'),
            listByOrder: db.collection('menu').orderBy('order')
        }
    },
    methods: {
        closeMenu () {
            $('.page-wrapper').toggleClass('toggled')
        },
        logout () {
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
