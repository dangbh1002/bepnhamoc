<template>
<div>
    <m-header :is-menu="true" />

    <main>
        <div class="category-content">
            <menu-left />

            <div class="column-right">
                <div class="column-right-inner">
                    <div class="title-block">
                        <div class="image-and-title">
                            <img class="img-fluid" src="~@/assets/img/image-2.png" alt="pr" />
                            <div class="title">
                                <h1>Bánh dứa taiwan</h1>
                            </div>
                        </div>
                        <p class="text-below">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet blandit elit. Nam rutrum dictum pretium. Donec arcu velit, feugiat et aliquam vel, vulputate quis sem.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia tortor. Maecenas nulla libero, fermentum in dapibus nec, molestie in nisi. Sed sed ipsum justo. Integer in eros egestas, aliquet ligula ut, hendrerit dui. Maecenas rhoncus sollicitudin tempor. Proin porta pretium ipsum, vitae rutrum nisi tempus quis. Nam eleifend neque at neque interdum blandit.
                        </p>
                    </div>
                    <div class="content-block">
                        <h3>nguyên liệu cần có</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id ex porta, accumsan lorem sollicitudin, pharetra diam. Nunc in porta urna. Vivamus a laoreet lacus, vel fringilla odio. Morbi pellentesque urna vel nibh fermentum, at tristique lectus sodales. Nam lectus lectus, maximus pretium quam ac, iaculis semper tellus. Aliquam faucibus quam sed diam porta convallis. Nulla sodales elit non tellus condimentum sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut maximus sapien id eleifend convallis. Nam diam nulla, faucibus non felis eget, dignissim pellentesque justo. Vestibulum ullamcorper vitae massa a iaculis. Nullam at condimentum justo, id maximus nunc. Maecenas quis tincidunt mauris.
                            Nam ut ultricies tellus. Vestibulum pellentesque, odio nec porttitor rhoncus, nisi tellus faucibus nibh, quis porttitor nulla diam at dolor. Nulla facilisi. Ut posuere tempus velit vitae fermentum. Fusce vitae malesuada felis. Fusce bibendum lorem fringilla nulla mollis, vitae fermentum lorem facilisis. Aenean dictum, augue in dictum ultrices, erat urna aliquet eros, commodo scelerisque enim tellus et ex.
                        </p>
                        <h3>cách làm</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id ex porta, accumsan lorem sollicitudin, pharetra diam. Nunc in porta urna. Vivamus a laoreet lacus, vel fringilla odio. Morbi pellentesque urna vel nibh fermentum, at tristique lectus sodales. Nam lectus lectus, maximus pretium quam ac, iaculis semper tellus. Aliquam faucibus quam sed diam porta convallis. Nulla sodales elit non tellus condimentum sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut maximus sapien id eleifend convallis. Nam diam nulla, faucibus non felis eget, dignissim pellentesque justo. Vestibulum ullamcorper vitae massa a iaculis. Nullam at condimentum justo, id maximus nunc. Maecenas quis tincidunt mauris.
                            Nam ut ultricies tellus. Vestibulum pellentesque, odio nec porttitor rhoncus, nisi tellus faucibus nibh, quis porttitor nulla diam at dolor. Nulla facilisi. Ut posuere tempus velit vitae fermentum. Fusce vitae malesuada felis. Fusce bibendum lorem fringilla nulla mollis, vitae fermentum lorem facilisis. Aenean dictum, augue in dictum ultrices, erat urna aliquet eros, commodo scelerisque enim tellus et ex.
                        </p>
                        <h3>lưu ý</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id ex porta, accumsan lorem sollicitudin, pharetra diam. Nunc in porta urna. Vivamus a laoreet lacus, vel fringilla odio. Morbi pellentesque urna vel nibh fermentum, at tristique lectus sodales. Nam lectus lectus, maximus pretium quam ac, iaculis semper tellus. Aliquam faucibus quam sed diam porta convallis. Nulla sodales elit non tellus condimentum sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut maximus sapien id eleifend convallis. Nam diam nulla, faucibus non felis eget, dignissim pellentesque justo. Vestibulum ullamcorper vitae massa a iaculis. Nullam at condimentum justo, id maximus nunc. Maecenas quis tincidunt mauris.
                            Nam ut ultricies tellus. Vestibulum pellentesque, odio nec porttitor rhoncus, nisi tellus faucibus nibh, quis porttitor nulla diam at dolor. Nulla facilisi. Ut posuere tempus velit vitae fermentum. Fusce vitae malesuada felis. Fusce bibendum lorem fringilla nulla mollis, vitae fermentum lorem facilisis. Aenean dictum, augue in dictum ultrices, erat urna aliquet eros, commodo scelerisque enim tellus et ex.
                        </p>
                        <h3>ảnh thành phần</h3>
                        <img class="img-fluid tp-12" src="~@/assets/img/tp-12.jpg" alt="anh tp" />
                        <img class="img-fluid tp-12" src="~@/assets/img/tp-12.jpg" alt="anh tp" />
                        <img class="img-fluid tp-3" src="~@/assets/img/tp-3.jpg" alt="anh tp" />
                    </div>
                </div>
            </div>
        </div>
    </main>

    <m-footer />
</div>
</template>

<script>
import MHeader from '@/components/Header'
import MFooter from '@/components/Footer'
import MenuLeft from '@/components/MenuLeft'

export default {
    name: 'Category',
    components: {
        MHeader,
        MFooter,
        MenuLeft
    },
    data() {
        return {}
    },
    created() {},
    methods: {}
}
</script>
