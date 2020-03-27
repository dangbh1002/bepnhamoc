<template>
  <div class="header">
    <div class="row">
      <div class="col-md-2 col-sm-2 col-col-3">
        <ul class="hd-lang">
          <li><img class = "img-fluid" src="~@/assets/img/vn-lang.png"/></li>
        </ul>
      </div>
      <div class="col-md-8 col-sm-8 col-xs-3">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><img src="~@/assets/img/btn-menu.jpg"/></button>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li :class="{'active': isHome}" class="nav-item">
              <a :class="{'active': isHome}" class="nav-link" href="#">Home -<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Menu -</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Recipe -</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact us -</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="logo">
        <a class="hidden-sm-down" href="#" title="logo"><img class = "img-fluid" src="~@/assets/img/logo.png" alt="logo" /></a>
        <a class="hidden-md-up" href="#" title="logo"><img class = "img-fluid" src="~@/assets/img/logo-mobile.jpg" alt="logo" /></a>
      </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-6">
      <form>
        <input value="" type="text" placeholder="Tìm kiếm..." />
        <button><img class = "img-fluid" src="~@/assets/img/btn-search.jpg" /></button>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    isHome: {
      type: Boolean,
      defaul: true,
    }
  }
}
</script>
