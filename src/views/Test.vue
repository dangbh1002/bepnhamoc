<template>
<div>
  <!--<div>-->
    <!--<input type="text"-->
           <!--v-model="newReptile"-->
           <!--@keyup.enter="addReptile">-->
    <!--<button @click="addReptile">-->
      <!--Add Reptile-->
    <!--</button>-->
  <!--</div>-->
  <!--<ul class="reptileList">-->
    <!--<li v-for="reptile in reptiles">-->
      <!--{{ reptile.name }} - -->
      <!--<button @click="deleteReptile(reptile)">-->
        <!--Remove-->
      <!--</button>-->
    <!--</li>-->
  <!--</ul>-->

  <ul class="reptileList mt-5">
    <!--{{ JSON.stringify(data) }}-->
    <li v-for="(item, index) in data" :key=index>
      {{ item.img }} <br/>
    </li>
  </ul>

  <!--<file-uploader/>-->

  <div >
    <p>Upload an image to Firebase:</p>
    <input type="file" @change="previewImage" accept="image/*" >
  </div>
  <div>
    <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
  </div>
  <div v-if="imageData!=null">
    <img class="preview" :src="picture">
    <br>
    <button @click="onUpload">Upload</button>
    <button @click="onDelete">Delete</button>
  </div>
</div>
</template>

<script>
import { db, firestorage } from '@/config/firebase'
import FileUploader from '@/components/FileUploader'

export default {
    name: 'Test',
    components: {
        FileUploader
    },
    data () {
        return {
            reptiles: [],
            data: [],
            newReptile: '',
            imageData: null,
            picture: null,
            uploadValue: 0
        }
    },
    firestore () {
        return {
            // reptiles: db.collection('reptiles'),
            data: db.collection('slide')
        }
    },
    methods: {
        addReptile: function () {
            this.$firestore.reptiles.add(
                {
                    name: this.newReptile,
                    timestamp: new Date()
                }
            )
            this.newReptile = ''
        },
        deleteReptile: function (reptile) {
            this.$firestore.reptiles.doc(reptile['.key']).delete()
        },

        previewImage (event) {
            this.uploadValue = 0
            this.picture = null
            this.imageData = event.target.files[0]
        },

        onUpload () {
            this.picture = null
            const storageRef = firestorage.ref(`${this.imageData.name}`).put(this.imageData)
            storageRef.on(`state_changed`, snapshot => {
                this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, error => { console.log(error.message) },
            () => {
                this.uploadValue = 100
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.picture = url
                })
            }
            )
        },
        onDelete () {
            firestorage
                .ref(`${this.imageData.name}`)
                .delete()
                .then(() => {
                    this.picture = ''
                })
                .catch((error) => {
                    console.error(`file delete error occured: ${error}`)
                })
        }
    }
}
</script>
