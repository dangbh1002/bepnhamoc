<template>
<b-carousel v-model="slide" :interval="4000" indicators class="slideshow">
    <b-carousel-slide>
        <template v-slot:img>
            <img class="img-fluid w-100" src="~@/assets/img/slide.jpg">
        </template>
    </b-carousel-slide>
    <b-carousel-slide>
        <template v-slot:img>
            <img class="img-fluid w-100" src="~@/assets/img/slide.jpg">
        </template>
    </b-carousel-slide>
    <b-carousel-slide>
        <template v-slot:img>
            <img class="img-fluid w-100" src="~@/assets/img/slide.jpg">
        </template>
    </b-carousel-slide>
</b-carousel>
</template>

<script>
export default {
    name: 'Slide',
    data() {
        return {
            slide: 0,
        }
    },
}
</script>
