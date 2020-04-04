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
          <b-button variant="primary" @click="createChild(menu['.key'], 'title')">
            Add
          </b-button>
        </b-col>
      </b-row>

      <b-table :items="getChildTable(menu['.key'])" :fields="fieldsChild" class="mt-5">
        <template v-slot:table-colgroup="scope">
          <col width="45%">
          <col>
          <col width="15%">
        </template>

        <template v-slot:cell(action)="{item}">
          <template v-if="isEditing[menu['.key']] && isEditing[menu['.key']][item.childNickName]">
            <b-button variant="primary" @click="onUpdate(item.childNickName, menu['.key'])">
              Save
            </b-button>
            <b-button variant="secondary" @click="onCancel(item.childNickName, menu['.key'])">
              Cancel
            </b-button>
          </template>
          <template v-else="">
            <b-button variant="outline-primary" @click="onEdit(item.childNickName, menu['.key'])">
              Edit
            </b-button>
            <b-button variant="outline-secondary" @click="onDelete(item.childNickName, menu['.key'])">
              Delete
            </b-button>
          </template>
        </template>

        <template v-slot:cell(childName)="{item}">
          <b-form-input v-if="childNameUpdate[menu['.key']] && isEditing[menu['.key']] && isEditing[menu['.key']][item.childNickName]" v-model="childNameUpdate[menu['.key']][item.childNickName]"/>
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
    props: {
        selectDetail: {
            type: String,
            default: null
        }
    },
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
        onEdit (key, type) {
            const editType = this.isEditing[type] || {}
            this.isEditing = {...this.isEditing, [type]: {...editType, [key]: true}}
            this.childNameUpdate[type] = {...this.childNameUpdate[type], [key]: this.getChild(type)[key]}
            this.childNickNameUpdate[type] = {...this.childNickNameUpdate[type], [key]: key}
        },
        onCancel (key, type) {
            this.isEditing[type] = {...this.isEditing[type], [key]: false}
            this.childNameUpdate[type] && delete this.childNameUpdate[type][key]
            this.childNickNameUpdate[type] && delete this.childNickNameUpdate[type][key]
        },
        onDelete (key, type) {
            const r = confirm('Do you want to delete?')
            if (r !== true) {
                return
            }
            const child = this.getChild(type)
            delete child[key]
            this.$firestore.list.doc(type).update({
                child
            }).then(() => {
                this.isEditing[type] = {...this.isEditing[type], [key]: false}
                console.log('Document successfully delete!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        onUpdate (key, type) {
            this.$firestore.list.doc(type).update({
                child: {...this.getChild(type), [key]: this.childNameUpdate[type][key]}
            }).then(() => {
                this.isEditing[type] = {...this.isEditing[type], [key]: false}
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        }
    }
}
</script>
