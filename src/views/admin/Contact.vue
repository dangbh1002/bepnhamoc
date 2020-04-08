<template>
  <div>
      <h4>Contact</h4>

      <div class="mt-3">
        <ckeditor v-model="editorData" :editor="ClassicEditor" ></ckeditor>

        <b-button variant="primary mt-3" @click="create()">
          Add
        </b-button>
      </div>
  </div>

</template>

<script>
import {db} from '@/config/firebase'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
    name: 'Contact',
    data () {
        return {
            ClassicEditor,
            editorData: null
        }
    },
    created () {
        let contact = {}
        db.collection('contact').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                contact = doc.data()
                console.log(contact.editorData)
                this.editorData = contact.editorData
            })
        })
    },
    methods: {
        create () {
            this.$firestore.contact.add({
                editorData: this.editorData,
                createdAt: new Date().getTime()
            }).then(() => {
                this.editorData = null
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        }
    }
}
</script>
