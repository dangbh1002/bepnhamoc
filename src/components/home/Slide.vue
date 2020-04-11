<template>
<b-carousel v-model="slide" :interval="4000" indicators class="slideshow">
    <b-carousel-slide v-for="(item, index) in data" :key=index>
        <template slot="img">
          <a v-if="item.url" :href="item.url"><img :src="item.img" class="img-fluid w-100"></a>
          <img v-else="" :src="item.img" class="img-fluid w-100">
        </template>
    </b-carousel-slide>
</b-carousel>
</template>

<script>
export default {
    name: 'Slide',
    props: {
        data: {
            type: Array,
            default: null
        }
    },
    data () {
        return {
            slide: 0
        }
    }
}
</script>
