<template>
<div class="cate-item">
    <div class="cate-item-inner">
        <div class="cate-image">
            <router-link :to="{name: 'Detail'}">
                <img :src="img" class="img-fluid" />
            </router-link>
        </div>
        <div class="cate-text">
            <h3>{{ title }}</h3>
            <p>{{ content }}</p>
            <a href="#" title="Xem thêm">Xem thêm</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        img: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
        }
    }
}
</script>
