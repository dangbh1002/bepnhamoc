<template>
  <div>
    <h2 class="mt-3">Menu List</h2>

    <b-row class="mt-5">
      <b-col sm="5">
        <b-row>
          <b-col sm="1">
            <label>Tên*</label>
          </b-col>
          <b-col sm="11">
            <b-form-input v-model="name" :state="errorEmpty ? false : null" id="input-name" placeholder="Enter tên"></b-form-input>
            <b-form-invalid-feedback id="input-name-feedback">
              {{ errorEmpty }}
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="2">
        <b-button variant="primary" @click="create()">
          Add
        </b-button>
      </b-col>
    </b-row>

    <b-table :items="listByOrder" :fields="fields" class="mt-5">
      <template v-slot:table-colgroup="scope">
        <col>
        <col width="25%">
      </template>

      <template v-slot:cell(action)="{item}">
        <template v-if="isEditing[item['.key']]">
          <b-button variant="primary" @click="onUpdate(item['.key'])">
            Save
          </b-button>
          <b-button variant="secondary" @click="onCancel(item['.key'])">
            Cancel
          </b-button>
        </template>
        <template v-else="">
          <b-button variant="outline-primary" @click="onEdit(item['.key'])">
            Edit
          </b-button>
          <b-button variant="outline-secondary" @click="onDelete(item['.key'])">
            Delete
          </b-button>
          <b-button variant="outline-success" @click="$router.push({name: 'AdminMenuCategory', params: {id: item['.key']}})">
            Detail
          </b-button>
        </template>
      </template>

      <template v-slot:cell(name)="{item}">
        <b-form-input v-if="nameUpdate[item['.key']] && isEditing[item['.key']]" v-model="nameUpdate[item['.key']]"/>
        <div v-else="">{{item.name}}</div>
      </template>

    </b-table>

  </div>

</template>

<script>
import {db} from '@/config/firebase'
export default {
    name: 'MenuLeft',
    data () {
        return {
            fields: [
                'name',
                {
                    key: 'action',
                    label: ''
                }
            ],
            list: [],
            name: null,
            nameUpdate: {},
            errorEmpty: null,
            isEditing: {},
            selectDetail: null
        }
    },
    firestore () {
        return {
            list: db.collection('menu'),
            listByOrder: db.collection('menu').orderBy('order')
        }
    },
    methods: {
        getItem (key) {
            return this.list.filter((item) => item['.key'] === key)[0]
        },
        create () {
            this.errorEmpty = null
            if (!this.name) {
                this.errorEmpty = 'Not empty'
                return
            }
            this.$firestore.list.add({
                name: this.name,
                order: this.list.length + 1,
                child: {},
                createdAt: new Date().getTime()
            }).then(() => {
                this.errorEmpty = null
                console.log('Document successfully updated!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        onEdit (key) {
            this.isEditing = {...this.isEditing, [key]: true}
            this.nameUpdate = {...this.nameUpdate, [key]: this.getItem(key).name}
        },
        onCancel (key) {
            this.isEditing = {...this.isEditing, [key]: false}
        },
        onDelete (key) {
            const r = confirm('Do you want to delete?')
            if (r !== true) {
                return
            }
            this.$firestore.list.doc(key).delete().then(() => {
                console.log('Document successfully delete!')
            }).catch((error) => {
                console.error('Error' + error)
            })
        },
        onUpdate (key) {
            this.$firestore.list.doc(key).update({
                name: this.nameUpdate[key],
                updatedAt: new Date().getTime()
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
