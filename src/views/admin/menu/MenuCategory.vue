<template>
  <div>
    <div v-for="(menu, key) in list" v-if="menu['.key'] === selectDetail" :key="key" class="mt-3">
      <h4>{{menu.name}}</h4>

      <b-row class="mt-5">
        <b-col sm="5">
          <b-row>
            <b-col sm="1">
              <label>Tên*</label>
            </b-col>
            <b-col sm="11">
              <b-form-input v-model="childName" :state="errorEmpty ? false : null" id="input-name" placeholder="Enter tên"></b-form-input>
              <b-form-invalid-feedback id="input-name-feedback">
                {{ errorEmpty }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="5">
          <b-row>
            <b-col sm="1">
              <label>Tên tắt</label>
            </b-col>
            <b-col sm="11">
              <b-form-input v-model="childNickName" disabled :state="errorAdd ? false : null" id="input-nickname" placeholder="Tên tắt"></b-form-input>
              <b-form-invalid-feedback id="input-nickname-feedback">
                {{ errorAdd }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="2">
          <b-button variant="primary" @click="createChild(selectDetail)">
            Add
          </b-button>
        </b-col>
      </b-row>

      <b-table :items="getChildTable(selectDetail)" :fields="fieldsChild" class="mt-5">
        <template v-slot:table-colgroup="scope">
          <col width="45%">
          <col>
          <col width="35%">
        </template>

        <template v-slot:cell(action)="{item}">
          <template v-if="isEditing[item.childNickName]">
            <b-button variant="primary" @click="onUpdate(item.childNickName)">
              Save
            </b-button>
            <b-button variant="secondary" @click="onCancel(item.childNickName)">
              Cancel
            </b-button>
          </template>
          <template v-else="">
            <b-button variant="outline-primary" @click="onEdit(item.childNickName)">
              Edit
            </b-button>
            <b-button variant="outline-secondary" @click="onDelete(item.childNickName)">
              Delete
            </b-button>
            <b-button variant="outline-success" @click="$router.push({name: 'AdminMenuPost', params: {id: item.childNickName, name: item.childName}})">
              Detail
            </b-button>
            <b-button variant="outline-success" @click="$router.push({name: 'AdminMenuPost', params: {id: item.childNickName, name: item.childName}})">
              Recipe
            </b-button>
          </template>
        </template>

        <template v-slot:cell(childName)="{item}">
          <b-form-input v-if="isEditing[item.childNickName]" v-model="childNameUpdate[item.childNickName]"/>
          <div v-else="">{{item.childName}}</div>
        </template>

        <template v-slot:cell(childNickName)="{item}">
          <div>{{item.childNickName}}</div>
        </template>
      </b-table>
    </div>

  </div>

</template>

<script>
import {db} from '@/config/firebase'
export default {
    name: 'MenuCategory',
    data () {
        return {
            fieldsChild: [
                {
                    key: 'childName',
                    label: 'Tên'
                },
                {
                    key: 'childNickName',
                    label: 'Tên tắt'
                },
                {
                    key: 'action',
                    label: ''
                }
            ],
            list: [],
            childName: null,
            childNickName: null,
            childNameUpdate: {},
            childNickNameUpdate: {},
            errorAdd: null,
            errorEmpty: null,
            isEditing: {}
        }
    },
    computed: {
        selectDetail () {
            return this.$route.params.id || 'bakery'
        }
    },
    firestore () {
        return {
            list: db.collection('menu')
        }
    },
    watch: {
        childName (newVal) {
            if (newVal) {
                this.childNickName = this.convertName(newVal)
            }
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
        getChild (key) {
            return this.getItem(key).child
        },
        getChildTable (key) {
            const arr = []
            Object.entries(this.getChild(key)).forEach(([childNickName, childName]) => {
                arr.push({childName, childNickName})
            })
            return arr
        },
        validateNickName (key, value) {
            const listNickName = Object.keys(this.getChild(key))
            if (listNickName.includes(value)) {
                return 'Đã tồn tại'
            }
            return false
        },
        createChild (key) {
            this.errorAdd = null
            this.errorEmpty = null
            if (!this.childNickName) {
                this.errorEmpty = 'Not empty'
                return
            }
            const validate = this.validateNickName(key, this.childNickName)
            if (validate) {
                this.errorAdd = validate
                return
            }
            this.$firestore.list.doc(key).update({
                child: {...this.getChild(key), [this.childNickName]: this.childName}
            }).then(() => {
                this.errorAdd = null
                this.errorEmpty = null
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        onEdit (key) {
            this.isEditing = {...this.isEditing, [key]: true}
            this.childNameUpdate = {...this.childNameUpdate, [key]: this.getChild(this.selectDetail)[key]}
            this.childNickNameUpdate = {...this.childNickNameUpdate, [key]: key}
        },
        onCancel (key) {
            this.isEditing = {...this.isEditing, [key]: false}
            this.childNameUpdate = {...this.childNameUpdate, [key]: null}
            this.childNickNameUpdate = {...this.childNickNameUpdate, [key]: null}
        },
        onDelete (key) {
            const r = confirm('Do you want to delete?')
            if (r !== true) {
                return
            }
            const child = this.getChild(this.selectDetail)
            delete child[key]
            this.$firestore.list.doc(this.selectDetail).update({
                child
            }).then(() => {
                this.isEditing = {...this.isEditing, [key]: false}
                console.log('Document successfully delete!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        onUpdate (key) {
            this.$firestore.list.doc(this.selectDetail).update({
                child: {...this.getChild(this.selectDetail), [key]: this.childNameUpdate[key]}
            }).then(() => {
                this.isEditing = {...this.isEditing, [key]: false}
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        }
    }
}
</script>
