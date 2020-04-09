<template>
  <div>
      <h4>Contact</h4>

      <div class="mt-3">
        <vue-editor
          v-model="editorData"
          useCustomImageHandler
          @image-added="handleImageAdded"></vue-editor>
        <b-button variant="primary mt-3" @click="updateData">
          Save
        </b-button>
      </div>
  </div>

</template>

<script>
import {db, firestorage} from '@/config/firebase'
import { VueEditor } from 'vue2-editor'
export default {
    name: 'Contact',
    components: {
        VueEditor
    },
    data () {
        return {
            contact: {},
            editorData: null,
            key: 'UW7ntmqDoZjVBaBeQBN2'
        }
    },
    firestore () {
        return {
            contactTable: db.collection('contact'),
            contact: db.collection('contact').doc(this.key)
        }
    },
    watch: {
        contact (newVal) {
            if (newVal.editorData) {
                this.editorData = this.contact.editorData
            }
        }
    },
    methods: {
        updateData () {
            this.$firestore.contactTable.doc(this.key).update({
                editorData: this.editorData
            }).then(() => {
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
        // upload image
            const imgName = `contact/${this.selectDetail}/${new Date().getTime()}-${file.name}`
            const storageRef = firestorage.ref(imgName).put(file)
            storageRef.on(`state_changed`, snapshot => {}, error => { console.log(error.message) },
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        Editor.insertEmbed(cursorLocation, 'image', url)
                        resetUploader()
                    })
                }
            )
        }
    }
}
</script>
