<template>
    <footer class="main-footer d-flex p-2 px-3 bg-white border-top">
        <div :class="[contained ? 'container' : 'container-fluid']">
            <div class="row">
                <ul class="nav">
                    <li v-for="(item, idx) in menuItems" :key="idx" class="nav-item">
                        <d-link class="nav-link" :to="item.to">{{ item.title }}</d-link>
                    </li>
                </ul>
                <span class="copyright ml-auto my-auto mr-2">{{ copyright }}</span>
            </div>
        </div>
    </footer>
</template>

<script>
    const footerNavItems = [
        { title: 'Home', to: '#' },
        { title: 'Services', to: '#' },
        { title: 'About', to: '#' },
        { title: 'Products', to: '#' },
        { title: 'Blog', to: '#' }
    ];
    export default {
        name: 'AppFooter',
        props: {
            menuItems: {
                type: Array,
                default() {
                    return footerNavItems;
                },
            },
            copyright: {
                type: String,
                default: `Copyright © ${ new Date().getFullYear() } Share-CV`,
            },
            contained: {
                type: Boolean,
                default: false,
            },
        }
    }
</script>

<style lang="scss" scoped>
.main-footer {
    position: sticky;
    bottom: 0;
}
.nav-link {
    color: #3D5170;
    &:hover {
        color: #3ab137;
        text-decoration: none;
    }
}
</style>
