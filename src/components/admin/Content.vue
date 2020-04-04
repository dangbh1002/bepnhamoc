<template>
  <div>
    <h2 class="mt-5">Content</h2>

    <b-table :items="list" :fields="fields">

      <template v-slot:table-colgroup="scope">
        <col width="25%">
        <col width="15%">
        <col width="25%">
        <col width="15%">
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

      <template v-slot:cell(title)="{item}">
        <template v-if="!isEditing.title[item['.key']]">
          <div>{{item.title}}</div>
          <b-button variant="outline-primary mt-3" @click="setModeEdit(item['.key'], 'title')">
            Edit
          </b-button>
        </template>
        <template v-else="">
          <b-form-input v-model="title[item['.key']]"/>

          <b-button variant="primary mt-3" @click="updateData(item['.key'], 'title')">
            Save
          </b-button>
          <b-button variant="secondary mt-3" @click="cancelEdit(item['.key'], 'title')">
            Cancel
          </b-button>
        </template>
      </template>

      <template v-slot:cell(footer)="{item}">
        <template v-if="!isEditing.footer[item['.key']]">
          <div>{{item.footer}}</div>
          <b-button variant="outline-primary mt-3" @click="setModeEdit(item['.key'], 'footer')">
            Edit
          </b-button>
        </template>
        <template v-else="">
          <b-form-input v-model="footer[item['.key']]"/>

          <b-button variant="primary mt-3" @click="updateData(item['.key'], 'footer')">
            Save
          </b-button>
          <b-button variant="secondary mt-3" @click="cancelEdit(item['.key'], 'footer')">
            Cancel
          </b-button>
        </template>
      </template>

      <template v-slot:cell(content)="{item}">
        <template v-if="!isEditing.content[item['.key']]">
          <div>{{item.content}}</div>
          <b-button variant="outline-primary mt-3" @click="setModeEdit(item['.key'], 'content')">
            Edit
          </b-button>
        </template>
        <template v-else="">
          <div><b-form-textarea v-model="content[item['.key']]" rows="5"/></div>

          <b-button variant="primary mt-3" @click="updateData(item['.key'], 'content')">
            Save
          </b-button>
          <b-button variant="secondary mt-3" @click="cancelEdit(item['.key'], 'content')">
            Cancel
          </b-button>
        </template>
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
            list: [],
            imageData: {},
            preview: {},
            uploadValue: {},
            imageDataBanner: {},
            previewBanner: {},
            uploadValueBanner: {},
            title: {},
            footer: {},
            content: {},
            isEditing: {title: {}, footer: {}, content: {}}
        }
    },
    firestore () {
        return {
            list: db.collection('home')
        }
    },
    mounted () {
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
        },
        setModeEdit (key, type) {
            this.isEditing[type] = {...this.isEditing[type], [key]: true}
            this[type] = {...this[type], [key]: this.getItem(key)[type]}
        },
        cancelEdit (key, type) {
            this.isEditing[type] = {...this.isEditing[type], [key]: false}
            delete this[type][key]
        },
        updateData (key, type) {
            this.$firestore.list.doc(key).update({
                [type]: this[type][key]
            }).then(() => {
                this.isEditing[type][key] = false
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        }
    }
}
</script>
