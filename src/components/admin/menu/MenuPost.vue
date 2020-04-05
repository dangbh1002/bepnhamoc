<template>
  <div>
      <h4>{{name}}</h4>

      <!--<b-row class="mt-5">-->
        <!--<b-col sm="5">-->
          <!--<b-row>-->
            <!--<b-col sm="1">-->
              <!--<label>Tên*</label>-->
            <!--</b-col>-->
            <!--<b-col sm="11">-->
              <!--<b-form-input v-model="childName" :state="errorEmpty ? false : null" id="input-name" placeholder="Enter tên"></b-form-input>-->
              <!--<b-form-invalid-feedback id="input-name-feedback">-->
                <!--{{ errorEmpty }}-->
              <!--</b-form-invalid-feedback>-->
            <!--</b-col>-->
          <!--</b-row>-->
        <!--</b-col>-->
        <!--<b-col sm="5">-->
          <!--<b-row>-->
            <!--<b-col sm="1">-->
              <!--<label>Tên tắt</label>-->
            <!--</b-col>-->
            <!--<b-col sm="11">-->
              <!--<b-form-input v-model="childNickName" disabled :state="errorAdd ? false : null" id="input-nickname" placeholder="Tên tắt"></b-form-input>-->
              <!--<b-form-invalid-feedback id="input-nickname-feedback">-->
                <!--{{ errorAdd }}-->
              <!--</b-form-invalid-feedback>-->
            <!--</b-col>-->
          <!--</b-row>-->
        <!--</b-col>-->
        <!--<b-col sm="2">-->
          <!--<b-button variant="primary" @click="createChild(menu['.key'], 'title')">-->
            <!--Add-->
          <!--</b-button>-->
        <!--</b-col>-->
      <!--</b-row>-->

      <b-table :items="list" :fields="fields" class="mt-5">
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
    name: 'MenuCategory',
    props: {
        selectDetail: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            fields: [
                {
                    key: 'img',
                    label: 'Image'
                },
                'title',
                'content',
                'menu_id',
                {
                    key: 'action',
                    label: ''
                }
            ],
            list: [],
            imageData: {},
            preview: {},
            uploadValue: {},
            title: {},
            content: {},
            isEditing: {title: {}, content: {}}
        }
    },
    firestore () {
        return {
            post: db.collection('post'),
            list: db.collection('post').where('menu_id', '==', this.selectDetail).limit(4)
        }
    },
    methods: {
        getItem (key) {
            return this.list.filter((item) => item['.key'] === key)[0]
        },
        previewImage (event, key) {
            this.uploadValue[key] = 0
            this.imageData = {...this.imageData, [key]: event.target.files[0]}
            console.log(this.imageData)
            this.preview[key] = URL.createObjectURL(this.imageData[key])
        },
        onUpload (key) {
            const oldImgName = this.getItem(key).imgName
            const imgName = `post/${this.selectDetail}/${new Date().getTime()}-${this.imageData[key].name}`
            const storageRef = firestorage.ref(imgName).put(this.imageData[key])
            storageRef.on(`state_changed`, snapshot => {
                this.uploadValue[key] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, error => { console.log(error.message) },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.$firestore.post.doc(key).update({
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
        setModeEdit (key, type) {
            this.isEditing[type] = {...this.isEditing[type], [key]: true}
            this[type] = {...this[type], [key]: this.getItem(key)[type]}
        },
        cancelEdit (key, type) {
            this.isEditing[type] = {...this.isEditing[type], [key]: false}
            delete this[type][key]
        },
        updateData (key, type) {
            this.$firestore.post.doc(key).update({
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
