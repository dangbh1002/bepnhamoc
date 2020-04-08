<template>
<div>
    <m-header :is-menu="true" />

    <main>
        <div class="category-content">
            <menu-left />

            <div class="column-right">
                <div class="column-right-inner">
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

    <m-footer />
</div>
</template>

<script>
import {db} from '@/config/firebase'
import MHeader from '@/components/Header'
import MFooter from '@/components/Footer'
import MenuLeft from '@/components/MenuLeft'

export default {
    name: 'Detail',
    components: {
        MHeader,
        MFooter,
        MenuLeft
    },
    data () {
        return {
            list: []
        }
    },
    firestore () {
        return {
            list: db.collection('post').where('nickName', '==', this.$route.params.id)
        }
    },
    computed: {
        post () {
            return this.list.length ? this.list[0] : {}
        }
    }
}
</script>
