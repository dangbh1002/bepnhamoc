<template>
  <div>
    <m-header :is-recipe="true"/>

    <main>
      <div class="category-content">
        <menu-left :is-recipe="true"/>

        <div class="column-right">
          <div class="column-right-inner">
            <item v-for="(item, key) in post"
                  :key="key"
                  :content="item.content"
                  :img="item.img"
                  :title="item.title"
                  :type="item.menuId"
                  :id="item.nickName"
                  menu="recipe"
            />
            <!--<div v-if="enableMore" class="read-more">-->
              <!--<a href="#" title="">Xem thêm <i class="fa fa-angle-double-down" aria-hidden="true"></i></a>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </main>

    <m-footer />
  </div>
</template>

<script>
import {db} from '@/config/firebase'
import MHeader from '@/components/Header'
import MFooter from '@/components/Footer'
import MenuLeft from '@/components/MenuLeft'
import Item from '@/components/detail/Item'

export default {
    name: 'Menu',
    components: {
        MHeader,
        MFooter,
        MenuLeft,
        Item
    },
    firestore () {
        return {
            menu: db.collection('menu'),
            post: db.collection('recipe').where('menuId', '==', this.id)
        }
    },
    data () {
        return {
            post: []
        }
    },
    computed: {
        enableMore () {
            return this.post && this.post.length > 4
        },
        id () {
            return this.$route.params.id || 'banh-a'
        }
    },
    watch: {
        id () {
            this.$router.go(0)
        }
    }
}
</script>
