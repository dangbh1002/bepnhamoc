<template>
  <div>
    <main>
      <div class="category-content">
        <menu-left :is-recipe="true"/>

        <div class="column-right">
          <div class="column-right-inner">
            <template v-if="post && post.length">
              <item v-for="(item, key) in post"
                    :key="key"
                    :content="item.content"
                    :img="item.img"
                    :title="item.title"
                    :type="item.menuId"
                    :id="item.nickName"
                    menu="recipe"
              />
            </template>
            <div v-else-if="isLoaded">
                Coming soon...
            </div>
            <!--<div v-if="enableMore" class="read-more">-->
              <!--<a href="#" title="">Xem thêm <i class="fa fa-angle-double-down" aria-hidden="true"></i></a>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {db} from '@/config/firebase'
import MenuLeft from '@/components/MenuLeft'
import Item from '@/components/detail/Item'

export default {
    name: 'Menu',
    components: {
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
            post: [],
            isLoaded: false
        }
    },
    created () {
        if (this.post) {
            setTimeout(() => {
                this.isLoaded = true
            }, 2000)
        }
    },
    computed: {
        enableMore () {
            return this.post && this.post.length > 4
        },
        id () {
            return this.$route.params.id || 'mon-an-viet-nam'
        }
    },
    watch: {
        id () {
            this.$router.go(0)
        }
    }
}
</script>

<style scoped>
.category-content .column-right .cate-item:first-child {
    min-height: 650px;
    margin-bottom: 0;
}
</style>
