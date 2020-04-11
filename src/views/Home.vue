<template>
  <div>
    <!--<div style="text-align: center">-->
      <!--<b-spinner v-show="isLoading" label="Spinning" class="my-5"></b-spinner>-->
    <!--</div>-->

    <template v-show="!isLoading">
      <main>
        <!-- SLIDESHOW -->
        <slide :data="slide"/>
        <item
          v-for="(item, index) in list"
          :key=index
          :banner="item.banner"
          :img="item.img"
          :title="item.title"
          :content="item.content"
          :type="item.type"
        />
      </main>

    </template>
  </div>
</template>

<script>
import {db} from '@/config/firebase'
import Slide from '@/components/home/Slide'
import Item from '@/components/home/Item'

export default {
    name: 'Home',
    components: {
        Slide,
        Item
    },
    data () {
        return {
            isLoading: true,
            slide: null,
            list: null
        }
    },
    firestore () {
        return {
            slide: db.collection('slide'),
            list: db.collection('home')
        }
    },
    created () {
        if (this.slide && this.list) {
            setTimeout(() => {
                this.isLoading = false
            }, 2000)
        }
    },
    methods: {}
}
</script>
