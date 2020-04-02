<template>
  <div>
    <h2 class="mt-5">Content</h2>

    <b-table :items="list" :fields="fields">

      <template v-slot:table-colgroup="scope">
        <col width="25%">
        <col width="10%">
        <col width="25%">
      </template>

      <template v-slot:cell(img)="{item}">
        <img :src="preview[item['.key']] || item.img" class="img-fluid"/>

        <div class="mt-3">
          <input type="file" @change="previewImage($event, item['.key'])" accept="image/*" >
        </div>
        <div>
          <p>Progress: {{(uploadValue[item['.key']] || 0).toFixed()+"%"}}
            <progress :value="uploadValue[item['.key']] || 0" max="100" ></progress>
          </p>
          <p v-if="uploadValue[item['.key']] === 100" class="text-primary">
            Success!!
          </p>
        </div>
        <b-button :disabled="!!!imageData[item['.key']]" variant="outline-primary" @click="onUpload(item['.key'])">
          Upload
        </b-button>
      </template>

      <template v-slot:cell(banner)="{item}">
        <img :src="previewBanner[item['.key']] || item.banner" class="img-fluid"/>

        <div class="mt-3">
          <input type="file" @change="previewImageBanner($event, item['.key'])" accept="image/*" >
        </div>
        <div>
          <p>Progress: {{(uploadValueBanner[item['.key']] || 0).toFixed()+"%"}}
            <progress :value="uploadValueBanner[item['.key']] || 0" max="100" ></progress>
          </p>
          <p v-if="uploadValueBanner[item['.key']] === 100" class="text-primary">
            Success!!
          </p>
        </div>
        <b-button :disabled="!!!imageDataBanner[item['.key']]" variant="outline-primary" @click="onUploadBanner(item['.key'])">
          Upload
        </b-button>
      </template>

    </b-table>
  </div>

</template>

<script>
import {db, firestorage} from '@/config/firebase'
export default {
    name: 'Content',
    data () {
        return {
            slide: null,
            fields: [
                {
                    key: 'img',
                    label: 'Image'
                },
                'title',
                'content',
                'footer',
                'banner'
            ],
            imageData: {},
            preview: {},
            uploadValue: {},
            imageDataBanner: {},
            previewBanner: {},
            uploadValueBanner: {}
        }
    },
    firestore () {
        return {
            list: db.collection('home')
        }
    },
    methods: {
        getItem (key) {
            return this.list.filter((item) => item['.key'] === key)[0]
        },
        previewImage (event, key) {
            this.uploadValue[key] = 0
            this.imageData = {...this.imageData, [key]: event.target.files[0]}
            this.preview[key] = URL.createObjectURL(this.imageData[key])
        },
        onUpload (key) {
            const oldImgName = this.getItem(key).imgName
            const imgName = `home/${new Date().getTime()}-${this.imageData[key].name}`
            const storageRef = firestorage.ref(imgName).put(this.imageData[key])
            storageRef.on(`state_changed`, snapshot => {
                this.uploadValue[key] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, error => { console.log(error.message) },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.$firestore.list.doc(key).update({
                        img: url,
                        imgName
                    }).then(() => {
                        this.uploadValue[key] = 100
                        this.imageData[key] = null
                        this.preview[key] = null
                        this.deleteImage(oldImgName)
                        console.log('Document successfully updated!')
                    }).catch((error) => {
                        console.error('Error' + error)
                    })
                })
            }
            )
        },
        deleteImage (name) {
            firestorage
                .ref(name)
                .delete()
                .then(() => {
                    console.log('file delete success')
                })
                .catch((error) => {
                    console.error(`file delete error occured: ${error}`)
                })
        },
        previewImageBanner (event, key) {
            this.uploadValueBanner[key] = 0
            this.imageDataBanner = {...this.imageDataBanner, [key]: event.target.files[0]}
            this.previewBanner[key] = URL.createObjectURL(this.imageDataBanner[key])
        },
        onUploadBanner (key) {
            const oldImgName = this.getItem(key).bannerName
            const imgName = `banner/${new Date().getTime()}-${this.imageDataBanner[key].name}`
            const storageRef = firestorage.ref(imgName).put(this.imageDataBanner[key])
            storageRef.on(`state_changed`, snapshot => {
                this.uploadValueBanner[key] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, error => { console.log(error.message) },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.$firestore.list.doc(key).update({
                        banner: url,
                        bannerName: imgName
                    }).then(() => {
                        this.uploadValueBanner[key] = 100
                        this.imageDataBanner[key] = null
                        this.previewBanner[key] = null
                        this.deleteImage(oldImgName)
                        console.log('Document successfully updated!')
                    }).catch((error) => {
                        console.error('Error' + error)
                    })
                })
            }
            )
        }
    }
}
</script>
