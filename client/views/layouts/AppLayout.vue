<template>
  <d-container fluid>
    <d-row>
      <app-sidebar :items="sidebarItems" />
      <d-col class="offset-lg-2 offset-md-3 p-0" lg="10" md="9" sm="12">
        <app-header />

        <main class="main-content" role="main">
          <slot />
        </main>

        <app-footer />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
    import AppHeader from '@/components/app/core/AppHeader';
    import AppFooter from '@/components/app/core/AppFooter';
    import AppSidebar from "@/components/app/core/AppSidebar";

      export default {
        name: 'AppLayout',
        components: {
          AppHeader, AppSidebar, AppFooter
        },
        data() {
          return {
            sidebarItems: [{
              title: 'Дашборд',
              to: {
                name: 'dashboard',
              },
              htmlBefore: '<i class="fas fa-chart-line fa-lg"></i>',
              htmlAfter: '',
            }, {
              title: 'Пользователи',
              htmlBefore: '<i class="fas fa-users fa-lg"></i>',
              to: {
                name: 'users-list',
              },
            }, {
              title: 'Документация',
              htmlBefore: '<i class="fas fa-book fa-lg"></i>',
              to: {
                name: 'docs',
              },
            }, {
              title: 'Отчёты по прайсам',
              htmlBefore: '<i class="fas fa-database fa-lg"></i>',
              to: {
                name: 'price-reports',
              },
            }, {
              title: 'Отчёты по звонкам',
              htmlBefore: '<i class="fas fa-phone-volume fa-lg"></i>',
              to: {
                name: 'tables',
              },
            }, {
              title: 'User Profile',
              htmlBefore: '<i class="material-icons fa-lg">person</i>',
              to: {
                name: 'user-profile-lite',
              },
            }, {
              title: 'Errors',
              htmlBefore: '<i class="material-icons fa-lg">error</i>',
              to: {
                name: 'errors',
              },
            }]
          }
        }
      }
</script>

<style lang="scss" scoped>
  .row {
    height: inherit!important;

    .main-content {
      height: 100vh;
    }
  }
</style>
