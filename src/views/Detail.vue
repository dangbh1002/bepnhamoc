<template>
<div>
    <main>
        <div class="category-content">
            <menu-left />

            <div class="column-right">
                <div v-if="post.img" class="column-right-inner">
                    <div class="title-block">
                        <div class="image-and-title">
                            <img class="img-fluid" :src="post.img" alt="pr" />
                            <div class="title">
                                <h1>{{ post.title }}</h1>
                            </div>
                        </div>
                        <p class="text-below">
                            {{ post.content }}
                        </p>
                    </div>
                    <div class="content-block" v-html="post.editorData" />
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import {db} from '@/config/firebase'
import MenuLeft from '@/components/MenuLeft'

export default {
    name: 'Detail',
    components: {
        MenuLeft
    },
    data () {
        return {
            list: []
        }
    },
    firestore () {
        return {
            list: db.collection(this.menu).where('nickName', '==', this.$route.params.id)
        }
    },
    computed: {
        menu () {
            return this.$route.params.menu || 'post'
        },
        isMenu () {
            return this.menu === 'post'
        },
        post () {
            return this.list.length ? this.list[0] : {}
        }
    }
}
</script>

<style scoped>
  img.img-fluid, .category-content .column-right .content-block img {
    border-radius: 35px !important;
  }
</style>
