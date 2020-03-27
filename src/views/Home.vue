<template>
  <div>
    <m-header :is-home="true"/>
    <b-alert show>{{ msg }}</b-alert>
  </div>
</template>

<script>
import { db } from '../config/db'
import MHeader from '@/components/Header'
export default {
  name: 'Home',
  components: {
    MHeader
  },
  firebase: {
    category: db.ref('category'),
    itemsObj: {
      source: db.ref('category'),
      asObject: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Bếp nhà Mộc'
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
  methods: {
  }
}
</script>
