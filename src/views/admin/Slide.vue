<template>
  <div>
    <h2 class="mt-2">Slide</h2>

    <b-table :items="slide" :fields="fields">

      <template v-slot:table-colgroup="scope">
        <col width="30%">
        <col width="30%">
        <col width="30%">
      </template>

      <template v-slot:cell(img)="data">
        <img :src="data.value" class="img-fluid"/>
      </template>

      <template v-slot:cell(action)="{item}">
        <div>
          <input type="file" @change="previewImage($event, item['.key'])" accept="image/*" >
        </div>

        <div>
          <p>Progress: {{(uploadValue[item['.key']] || 0).toFixed()+"%"}}
            <progress id="progress" :value="uploadValue[item['.key']] || 0" max="100" ></progress>
          </p>
          <p v-if="uploadValue[item['.key']] === 100" class="text-primary">
              Success!!
          </p>
        </div>
        <b-button :disabled="!!!imageData[item['.key']]" variant="outline-primary" @click="onUpload(item['.key'])">Upload</b-button>
      </template>

      <template v-slot:cell(preview)="{item}">
        <div v-if="preview[item['.key']]">
          <img class="img-fluid" :src="preview[item['.key']]">
          <br>
        </div>
      </template>

      <template v-slot:cell(url)="{item}">
        <template v-if="!isEditing[item['.key']]">
          <div>{{item.url}}</div>
          <b-button variant="outline-primary mt-3" @click="setModeEdit(item['.key'], 'url')">
            Edit
          </b-button>
        </template>
        <template v-else="">
          <b-form-input v-model="url[item['.key']]"/>

          <b-button variant="primary mt-3" @click="updateData(item['.key'], 'url')">
            Save
          </b-button>
          <b-button variant="secondary mt-3" @click="cancelEdit(item['.key'], 'url')">
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
    name: 'Slide',
    data () {
        return {
            slide: null,
            fields: [
                {
                    key: 'img',
                    label: 'Image'
                },
                {
                    key: 'action',
                    label: 'Upload'
                },
                {
                    key: 'preview',
                    label: 'Preview'
                },
                'url'
            ],
            imageData: {},
            preview: {},
            uploadValue: {},
            url: {},
            isEditing: {}
        }
    },
    firestore () {
        return {
            slide: db.collection('slide')
        }
    },
    methods: {
        previewImage (event, key) {
            this.uploadValue[key] = 0
            this.imageData = {...this.imageData, [key]: event.target.files[0]}
            this.preview[key] = URL.createObjectURL(this.imageData[key])
        },
        onUpload (key) {
            const oldImgName = this.slide.filter((item) => item['.key'] === key)[0].name
            const imgName = `slide/${new Date().getTime()}-${this.imageData[key].name}`
            const storageRef = firestorage.ref(imgName).put(this.imageData[key])
            storageRef.on(`state_changed`, snapshot => {
                this.uploadValue[key] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, error => { console.log(error.message) },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.$firestore.slide.doc(key).update({
                        img: url,
                        name: imgName,
                        updatedAt: new Date().getTime()
                    }).then(() => {
                        this.uploadValue[key] = 100
                        this.imageData[key] = null
                        this.preview[key] = null
                        this.deleteImage(oldImgName)
                        console.log('Document successfully updated!')
                    }).catch(() => {
                        console.error('Error')
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
        getItem (key) {
            return this.slide.filter((item) => item['.key'] === key)[0]
        },
        setModeEdit (key, type) {
            this.isEditing = {...this.isEditing, [key]: true}
            this[type] = {...this[type], [key]: this.getItem(key)[type]}
        },
        cancelEdit (key, type) {
            this.isEditing = {...this.isEditing, [key]: false}
            delete this[type][key]
        },
        updateData (key, type) {
            this.$firestore.slide.doc(key).update({
                [type]: this[type][key],
                updatedAt: new Date().getTime()
            }).then(() => {
                this.isEditing[key] = false
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        }
    }
}
</script>
