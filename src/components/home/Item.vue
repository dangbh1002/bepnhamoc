<template>
  <div>
    <router-link :to="{name: type === 'recipe' ? 'Recipe' : 'Menu', params: {type}}">
      <div class="main-content">
        <div class="main-content-inner">
          <div class="content-image">
              <img :src="img" class="img-fluid"/>
          </div>
            <div class="content-text">
              <h3>{{ title }}</h3>
              <p>{{ content }}</p>
              <p class="text-below">{{ footer }}</p>
            </div>
        </div>
      </div>
    </router-link>

    <router-link :to="{name: type === 'recipe' ? 'Recipe' : 'Menu', params: {type}}">
      <div class="banner">
          <img :src="banner" class="img-fluid p-0" alt=""/>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        banner: {
            type: String,
            default: null
        },
        img: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped>
  a:hover {
    text-decoration: none;
    color: #3b2314;
  }
</style>
