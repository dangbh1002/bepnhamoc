<template>
<div>
    <m-header :is-recipe="true"/>

    <main>
        <div class="category-content">
            <menu-left :is-recipe="true"/>

            <div class="column-right">
                <div class="column-right-inner">
                    <item :content="content" img="2.jpg" title="Bánh dứa taiwan" />
                    <item :content="content" img="3.jpg" title="Bánh dứa taiwan" />
                    <item :content="content" img="1.jpg" title="Bánh dứa taiwan" />
                    <item :content="content" img="2.jpg" title="Bánh dứa taiwan" />
                    <div class="read-more">
                        <a href="#" title="">Xem thêm <i class="fa fa-angle-double-down" aria-hidden="true"></i></a>
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
import Item from '@/components/detail/Item'

export default {
    name: 'Recipe',
    components: {
        MHeader,
        MFooter,
        MenuLeft,
        Item
    },
    data () {
        return {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet blandit elit. Nam rutrum dictum pretium. Donec arcu velit, feugiat et aliquam vel, vulputate quis sem. Vestibulum sit amet lobortis diam. Integer lacinia nulla at nisl tristique porttitor. Aenean commodo lacus et erat elementum, eu facilisis enim efficitur.'
        }
    },
    created () {},
    methods: {}
}
</script>
