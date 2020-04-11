<template>
<div class="cate-item">
    <div class="cate-item-inner">
        <div class="cate-image">
            <img :src="img" class="img-fluid" />
        </div>
        <div class="cate-text">
            <h3>{{ title }}</h3>
            <p>{{ content }}</p>
            <router-link :to="{name: menu === 'menu' ? 'MenuPostDetail' : 'RecipePostDetail', params: {id, type, menu}}">Xem thêm</router-link>
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
        },
        id: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        menu: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped>
  img.img-fluid {
    border-radius: 35px;
  }
</style>
