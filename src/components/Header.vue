<template>
<header>
    <div class="header">
        <div class="row">
            <div class="col-md-2 col-sm-2 col-col-3">
                <ul class="hd-lang">
                    <li><img class="img-fluid" src="~@/assets/img/vn-lang.png" /></li>
                </ul>
            </div>
            <div class="col-md-8 col-sm-8 col-xs-3">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button v-b-toggle="'navbarNav'" class="navbar-toggler" type="button"><img src="~@/assets/img/btn-menu.jpg" alt="btn menu" /></button>
                    <b-collapse id="navbarNav">
                        <i class="fa fa-times close" v-b-toggle="'navbarNav'" aria-hidden="true"></i>
                        <div class="bg-over-lay"></div>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a :class="{'active': isHome}" class="nav-link" href="#">Home -<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu -</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li class="nav-item"><a class="dropdown-item" href="#">Bánh A</a></li>
                                    <li class="nav-item"><a class="dropdown-item" href="#">Bánh b</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Recipe -</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li class="nav-item"><a class="dropdown-item" href="#">Bánh A</a></li>
                                    <li class="nav-item"><a class="dropdown-item" href="#">Bánh b</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Contact us -</a>
                            </li>
                        </ul>
                    </b-collapse>
                </nav>
                <div class="logo">
                    <a class="hidden-sm-down" href="#" title="logo"><img class="img-fluid" src="~@/assets/img/logo.png" alt="logo" /></a>
                    <a class="hidden-md-up" href="#" title="logo"><img class="img-fluid" src="~@/assets/img/logo-mobile.jpg" alt="logo" /></a>
                </div>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-6">
                <form>
                    <input value="" type="text" placeholder="Tìm kiếm..." />
                    <button><img class="img-fluid" src="~@/assets/img/btn-search.jpg" /></button>
                </form>
            </div>
        </div>
    </div>
</header>
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
