<template>
  <div>
    <button
      @click="selectFile"
      v-if="!uploadEnd && !uploading">
      Upload a cover image
    </button>
    <form ref="form">
      <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event)" />
    </form>
    <img
      v-if="uploadEnd"
      :src="downloadURL"
      width="100%" />
    <div v-if="uploadEnd">
      <button
        class="ma-0"
        dark
        small
        color="error"
        @click="deleteImage()"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { firestorage } from '@/config/firebase'
export default {
    props: ['oldImgUrl'],
    data () {
        return {
            progressUpload: 0,
            fileName: '',
            uploadTask: '',
            uploading: false,
            uploadEnd: false,
            downloadURL: ''
        }
    },
    created () {
        if (this.oldImgUrl) this.setCoverImgOnUpdate()
    },
    methods: {
        selectFile () {
            this.$refs.uploadInput.click()
        },
        detectFiles (e) {
            let fileList = e.target.files || e.dataTransfer.files
            Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
            })
        },
        upload (file) {
            this.fileName = file.name
            this.uploading = true
            this.uploadTask = firestorage.ref('images/' + file.name).put(file)
        },
        deleteImage () {
            if (this.oldImgUrl === '') {
                this.deleteImgOnFirebase()
            } else {
                this.deleteImgOnUpdate()
            }
            this.$refs.form.reset()
        },
        setCoverImgOnUpdate () {
            this.uploadEnd = true
            this.downloadURL = this.oldImgUrl
        },
        deleteImgOnFirebase () {
            firestorage
                .ref('images/' + this.fileName)
                .delete()
                .then(() => {
                    this.uploading = false
                    this.uploadEnd = false
                    this.downloadURL = ''
                })
                .catch((error) => {
                    console.error(`file delete error occured: ${error}`)
                })
        },
        deleteImgOnUpdate () {
            this.uploading = false
            this.uploadEnd = false
            this.downloadURL = ''
        }
    },
    watch: {
        uploadTask: function () {
            this.uploadTask.on('state_changed', sp => {
                this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
            },
            null,
            () => {
                this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    this.uploadEnd = true
                    this.downloadURL = downloadURL
                    this.$emit('downloadURL', downloadURL)
                })
            })
        }
    }
}
</script>

<style>
  .progress-bar {
    margin: 10px 0;
  }
  input[type="file"] {
    position: absolute;
    clip: rect(0,0,0,0);
  }
</style>
