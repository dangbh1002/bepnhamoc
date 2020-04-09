<template>
<div>
    <m-header :is-contact="true" />
    <main>
        <div class="category-content">
            <div class="column-right">
                <div class="column-right-inner">
                  <div v-html="data.editorData" />
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
    name: 'ContactUs',
    components: {
        MHeader,
        MFooter,
        MenuLeft
    },
    firestore () {
        return {
            data: db.collection('contact').doc('UW7ntmqDoZjVBaBeQBN2')
        }
    },
    data () {
        return {
            data: {}
        }
    },
}
</script>

<style scoped>
  .category-content .column-right {
    width: 100%;
  }
</style>
