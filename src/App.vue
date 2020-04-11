<template>
  <div id="app">
    <m-header v-if="!$route.meta || $route.meta && !$route.meta.isAdmin"/>
    <router-view/>
    <m-footer v-if="!$route.meta || $route.meta && !$route.meta.isAdmin"/>
  </div>
</template>

<script>
import MHeader from '@/components/Header'
import MFooter from '@/components/Footer'
export default {
    name: 'App',
    components: {
        MHeader,
        MFooter
    }
}
</script>
