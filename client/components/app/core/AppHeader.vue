<template>
    <div :class="['main-navbar', 'bg-white', stickyTop ? 'sticky-top' : '']">
        <d-navbar type="light" class="align-items-stretch flex-md-nowrap p-0">
            <app-header-nav />
            <app-header-sidebar-toggle />
        </d-navbar>
    </div>
</template>

<script>
    import AppHeaderNav from '@/components/app/core/AppHeaderNav';
    import AppHeaderSidebarToggle from '@/components/app/core/AppHeaderSidebarToggle';

    export default {
        name: 'AppHeader',
        props: {
            stickyTop: {
                type: Boolean,
                default: true,
            },
        },
        components: {
            AppHeaderNav,
            AppHeaderSidebarToggle
        }
    }
</script>

<style lang="scss" scoped>
    .main-navbar {
        display: flex;
        justify-content: flex-end;
        .dropdown-menu {
            display: block;
        }
    }
</style>
