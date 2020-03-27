<template>
<div>
    <m-header :is-home="true" />

    <main>
        <!-- SLIDESHOW -->
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

        <div class="main-content">
            <div class="main-content-inner">
                <div class="content-image">
                    <img class="img-fluid" src="~@/assets/img/image-2.png" />
                </div>
                <div class="content-text">
                    <h3>Các loại bánh</h3>
                    <p>Nơi chia sẻ những công thức làm món ăn của nhà Mộc. Các loại bánh ngọt, bánh mỳ, bánh dinh dưỡng... Cũng như những hình ảnh đẹp của các loại bánh nhà Mộc làm. Cùng nhau khám phá xem trong căn bếp nhà Mộc có những món bánh nào nhé!</p>
                    <p class="text-below">Mộc Bkery</p>
                </div>
            </div>
        </div>

        <div class="banner">
            <img class="img-fluid" src="~@/assets/img/bn1.jpg" alt="" />
        </div>

        <div class="main-content">
            <div class="main-content-inner">
                <div class="content-image">
                    <img class="img-fluid" src="~@/assets/img/image-1.png" />
                </div>
                <div class="content-text">
                    <h3>Các món ăn</h3>
                    <p>Nơi chia sẻ những công thức làm món ăn của nhà Mộc. Các loại bánh ngọt, bánh mỳ, bánh dinh dưỡng... Cũng như những hình ảnh đẹp của các loại bánh nhà Mộc làm. Cùng nhau khám phá xem trong căn bếp nhà Mộc có những món bánh nào nhé!</p>
                    <p class="text-below">Mộc Food</p>
                </div>
            </div>
        </div>

        <div class="banner">
            <img class="img-fluid" src="~@/assets/img/bn2.jpg" alt="" />
        </div>

        <div class="main-content last">
            <div class="main-content-inner">
                <div class="content-image">
                    <img class="img-fluid" src="~@/assets/img/image-2.png" />
                </div>
                <div class="content-text">
                    <h3>Công thức</h3>
                    <p>Nơi chia sẻ những công thức làm món ăn của nhà Mộc. Các loại bánh ngọt, bánh mỳ, bánh dinh dưỡng... Cũng như những hình ảnh đẹp của các loại bánh nhà Mộc làm. Cùng nhau khám phá xem trong căn bếp nhà Mộc có những món bánh nào nhé!</p>
                    <p class="text-below">Mộc's Recipe</p>
                </div>
            </div>
        </div>

        <div class="banner">
            <img class="img-fluid" src="~@/assets/img/bn3.jpg" alt="" />
        </div>

    </main>

    <m-footer />
</div>
</template>

<script>
import {
    db
} from '../config/db'
import MHeader from '@/components/Header'
import MFooter from '@/components/Footer'

export default {
    name: 'Home',
    components: {
        MHeader,
        MFooter
    },
    firebase: {
        category: db.ref('category'),
        itemsObj: {
            source: db.ref('category'),
            asObject: true
        }
    },
    data() {
        return {
            msg: 'Welcome to Bếp nhà Mộc',
            slide: 0,
        }
    },
    created() {
        console.log(this.itemsObj)
        // db.collection('category')
        // .get()
        // .then(querySnapshot => {
        //   const documents = querySnapshot.docs.map(doc => doc.data())
        //   // do something with documents
        // })
    },
    methods: {}
}
</script>
