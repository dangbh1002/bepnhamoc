<template>
  <div>
    <a :href="url">
      <div class="main-content">
        <div class="main-content-inner">
          <div class="content-text d-none">
            <h3>{{ title }}</h3>
            <hr>
          </div>
          <div class="content-image">
              <img :src="img" class="img-fluid"/>
          </div>
          <div class="content-text content-text-sp">
            <h3>{{ title }}</h3>
            <p>{{ content }}</p>
          </div>
        </div>
      </div>
    </a>

    <a :href="url">
      <div class="banner">
          <img :src="banner" class="img-fluid p-0" alt=""/>
      </div>
    </a>
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
        url: {
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
  img.img-fluid {
    border-radius: 35px;
  }
  .banner img.img-fluid {
    border-radius: 0px !important;
  }
</style>
