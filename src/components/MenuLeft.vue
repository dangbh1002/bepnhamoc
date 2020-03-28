<template>
<div class="column-left">
    <ul>
        <li>
            <a href="#" title="Các loại bánh">Các loại bánh</a>
            <ul class="nqt-submenu">
                <li class="nav-item">
                    <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh Á</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh Âu</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Category'}" class="dropdown-item">Bánh dinh dưỡng</router-link>
                </li>
            </ul>
        </li>
        <li><a href="#" title="Các món ăn">Các món ăn</a></li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'MenuLeft',
    props: {
        isHome: {
            type: Boolean,
            defaul: true,
        },
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
