<template>
<div>
    <main>
        <div class="category-content">
            <div class="column-right">
                <div class="column-right-inner">
                  <div v-html="data.editorData" />
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import {db} from '@/config/firebase'

export default {
    name: 'ContactUs',
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
