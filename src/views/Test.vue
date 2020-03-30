<template>
<div>
  <div>
    <input type="text"
           v-model="newReptile"
           @keyup.enter="addReptile">
    <button @click="addReptile">
      Add Reptile
    </button>
  </div>
  <ul class="reptileList">
    <li v-for="reptile in reptiles">
      {{ reptile.name }} -
      <button @click="deleteReptile(reptile)">
        Remove
      </button>
    </li>
  </ul>

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
  </div>
</div>
</template>

<script>
import { db } from '../config/firebase.js'

export default {
    name: 'Test',
    data () {
        return {
            reptiles: [],
            newReptile: '',
            imageData: null,
            picture: null,
            uploadValue: 0
        }
    },
    firestore () {
        return {
            reptiles: db.collection('reptiles')
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
            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
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
        }
    }
}
</script>
