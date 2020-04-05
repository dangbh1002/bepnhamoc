<template>
<div class="column-left">
    <ul>
        <li v-for="(item, key) in list" :key="key" v-if="getFirstChild(item['.key'])">
            <router-link :to="{name: 'MenuDetail', params: {id: getFirstChild(item['.key']) }}" :class="{ 'selected': activeArr.includes(item['.key']) }">
              {{item.name}}
            </router-link>
            <ul v-if="Object.keys(item.child).length" class="nqt-submenu">
                <li v-for="(id, k) in Object.keys(item.child)" :key="k" class="nav-item">
                    <router-link :to="{name: 'MenuDetail', params: {id}}" :class="{'selected': activeArr.includes(id) }" class="dropdown-item">{{item.child[id]}}</router-link>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
import {db} from '@/config/firebase'
export default {
    name: 'MenuLeft',
    data () {
        return {
            list: []
        }
    },
    firestore () {
        return {
            list: db.collection('menu')
        }
    },
    computed: {
        activeArr () {
            const arr = []
            const selected = this.selected || 'banh-a'
            const filter = this.list.filter((item) => item.child[selected])
            arr.push(selected)
            if (filter) {
                arr.push(filter[0]['.key'])
            }
            return arr
        },
        selected () {
            return this.$route.params.id || null
        }
    },
    methods: {
        getFirstChild (key) {
            const filter = this.list.filter((item) => item['.key'] === key)[0]
            return Object.keys(filter.child).length && Object.keys(filter.child)[0]
        }
    }
}
</script>
