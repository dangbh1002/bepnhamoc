<template>
  <div>
      <h4>{{name}}</h4>

      <div class="mt-3">

        <div role="group">
          <label>Image:</label>
          <div v-if="previewCreate" class="mb-3"><img :src="previewCreate" class="img-fluid" style="width:200px"/></div>
          <div>
            <input type="file" @change="previewImageCreate" accept="image/*" >
          </div>
        </div>

        <div role="group" class="mt-3">
          <label>Title:</label>
          <b-form-input
            id="input-title"
            v-model="newTitle"
            placeholder="Enter Title"
            trim
          ></b-form-input>
          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-title-feedback">
            {{ errorEmpty }}
          </b-form-invalid-feedback>
        </div>

        <div role="group" class="mt-3">
          <label>Tên tắt:</label>
          <b-form-input
            id="input-nickname"
            v-model="nickName"
            :state="errorAdd ? false : null"
            placeholder="Tên tắt"
            disabled
          ></b-form-input>
          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-nickname-feedback">
            {{ errorAdd }}
          </b-form-invalid-feedback>
        </div>

        <div role="group" class="mt-3">
          <label>Content:</label>
          <b-form-textarea
            id="input-content"
            v-model="newContent"
            placeholder="Enter Content"
            rows="5"
          ></b-form-textarea>
        </div>

        {{ editorData }}

        <div role="group" class="mt-3">
          <label>Content Detail:</label>
        </div>

        <b-button variant="primary mt-3" @click="create()">
          Add
        </b-button>
      </div>

      <b-table :items="list" :fields="fields" class="mt-5">
        <template v-slot:table-colgroup="scope">
          <col width="30%">
          <col width="20%">
          <col width="30%">
          <col width="20%">
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

        <template v-slot:cell(action)="{item}">
            <b-button variant="outline-secondary" @click="onDelete(item['.key'])">
              Delete
            </b-button>
            <b-button variant="outline-success" @click="toogleDetail(item['.key'])">
              Detail
            </b-button>
        </template>

      </b-table>

  </div>

</template>

<script>
import {db, firestorage} from '@/config/firebase'
export default {
    name: 'MenuPost',
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
                {
                    key: 'nickName',
                    label: 'Tên tắt'
                },
                'content',
                {
                    key: 'action',
                    label: ''
                }
            ],
            newTitle: null,
            newContent: null,
            nickName: null,
            previewCreate: null,
            imageDataCreate: null,
            errorAdd: null,
            editorData: null,
            list: [],
            imageData: {},
            preview: {},
            uploadValue: {},
            title: {},
            content: {},
            isEditing: {title: {}, content: {}},
            errorEmpty: null
        }
    },
    firestore () {
        return {
            post: db.collection('post'),
            list: db.collection('post').where('menuId', '==', this.selectDetail)
        }
    },
    watch: {
        newTitle (newVal) {
            this.nickName = this.convertName(newVal)
        }
    },
    methods: {
        convertName (str) {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .replace(/ /g, '-')
                .toLowerCase()
        },
        getItem (key) {
            return this.list.filter((item) => item['.key'] === key)[0]
        },
        previewImageCreate (event) {
            this.imageDataCreate = event.target.files[0]
            this.previewCreate = URL.createObjectURL(this.imageDataCreate)
            console.log(this.previewCreate)
        },
        create () {
            this.errorAdd = null
            const filter = this.list.filter((item) => item.nickName === this.nickName)
            if (filter && filter.length) {
                this.errorAdd = 'Đã tồn tại'
                return
            }

            // upload image
            const imgName = `post/${this.selectDetail}/${new Date().getTime()}-${this.imageDataCreate.name}`
            const storageRef = firestorage.ref(imgName).put(this.imageDataCreate)
            storageRef.on(`state_changed`, snapshot => {}, error => { console.log(error.message) },
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.$firestore.post.add({
                            img: url,
                            imgName,
                            menuId: this.selectDetail,
                            title: this.newTitle,
                            content: this.newContent,
                            nickName: this.nickName,
                            createdAt: new Date().getTime()
                        }).then(() => {
                            console.log('Document successfully updated!')
                        }).catch((error) => {
                            console.error('Error' + error)
                        })
                    })
                }
            )
        },
        previewImage (event, key) {
            this.uploadValue[key] = 0
            this.imageData = {...this.imageData, [key]: event.target.files[0]}
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
        },
        onDelete (key) {
            const r = confirm('Do you want to delete?')
            if (r !== true) {
                return
            }
            this.$firestore.post.doc(key).delete().then(() => {
                console.log('Document successfully delete!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        toogleDetail (key) {

        }
    }
}
</script>
