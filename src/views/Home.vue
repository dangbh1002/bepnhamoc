<template>
  <div>

    <m-header :is-home="true"/>

    <!--<div style="text-align: center">-->
      <!--<b-spinner v-if="isLoading" label="Spinning" class="my-5"></b-spinner>-->
    <!--</div>-->

    <template v-show="!isLoading">
      <main>
        <!-- SLIDESHOW -->
        <slide :data="slide"/>
        <item
          v-for="item in list"
          :banner="item.banner"
          :img="item.img"
          :title="item.title"
          :content="item.content"
          :footer="item.footer"
          :type="item.type"
        />
      </main>

      <m-footer v-if="!isLoading"/>

    </template>
  </div>
</template>

<script>
import {db} from '@/config/firebase'
import MHeader from '@/components/Header'
import MFooter from '@/components/Footer'
import Slide from '@/components/home/Slide'
import Item from '@/components/home/Item'

export default {
    name: 'Home',
    components: {
        MHeader,
        MFooter,
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
            }, 1000)
        }
    },
    methods: {}
}
</script>
