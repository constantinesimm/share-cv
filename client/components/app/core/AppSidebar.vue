<template>
  <aside :class="['main-sidebar', 'col-12', 'col-md-3', 'col-lg-2', 'px-0', sidebarVisible ? 'open' : '']">
    <div class="main-navbar">
      <nav class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap p-0">
        <router-link to="/" tag="a" class="navbar-brand w-100 mr-0" style="line-height: 25px;">
          <div class="d-flex align-items-center m-auto">
            <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 85px; height: 75px;"
                 src="@/assets/image/share-logo.png" alt="Shards Dashboard">
          </div>
        </router-link>
        <div class="toggle-sidebar d-sm-inline d-md-none d-lg-none" @click="handleToggleSidebar()">
          <i class="material-icons">&#xE5C4;</i>
        </div>
      </nav>
    </div>

    <!--
    <form action="#" class="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
      <div class="input-group input-group-seamless ml-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="fas fa-search"></i>
          </div>
        </div>
        <input class="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search">
      </div>
    </form>
    -->
    <div class="nav-wrapper">
      <d-nav class="flex-column">
        <li v-for="(item, navItemIdx) in items" :key="navItemIdx" class="nav-item dropdown" :no-flip="false">
          <router-link tag="a"
                       :class="['nav-link', 'themed__link', item.items && item.items.length ? 'dropdown-toggle' : '']"
                       :to="item.to" v-d-toggle="`snc-${navItemIdx}`">
            <div class="item-icon-wrapper" v-if="item.htmlBefore" v-html="item.htmlBefore"/>
            <span v-if="item.title">{{ item.title }}</span>
            <div class="item-icon-wrapper" v-if="item.htmlAfter" v-html="item.htmlAfter"/>
          </router-link>
          <d-collapse v-if="item.items && item.items.length" :id="`snc-${navItemIdx}`"
                      class="dropdown-menu dropdown-menu-small" accordion="sidebar-items-accordion">
            <d-dropdown-item v-for="(subItem, subItemIdx) in item.items" :key="subItemIdx" :href="subItem.href"
                             :to="subItem.to">
              {{ subItem.title }}
            </d-dropdown-item>
          </d-collapse>
        </li>
      </d-nav>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'AppSidebar',
    props: {
      hideLogoText: {
        type: Boolean,
        default: false,
      },
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        sidebarVisible: true,
      };
    },
    created() {
      this.$eventHub.$on('toggle-sidebar', this.handleToggleSidebar);
    },
    beforeDestroy() {
      this.$eventHub.$off('toggle-sidebar');
    },
    methods: {
      handleToggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .main-sidebar .navbar-brand {
    @media (min-width: 768px) {
      overflow: initial!important;
    }
  }
  .main-sidebar.open .navbar-brand {
    overflow: initial!important;
  }

  .main-sidebar {
    width: 0;
    height: 100%;

    &.open {
      width: 100%;
    }

    .item-icon-wrapper {
      display: inline-block;
    }

    .dropdown-menu {
      display: block;
    }

    .main-navbar {
      height: 15%;

      @media (max-width: 768px) {
        overflow: initial!important;
      }

      .navbar {
        &-brand {

        }
      }
    }

    .nav-wrapper {
      height: 85%;
      padding-top: 15px;
    }

    .nav {
      .navbar-brand {
        @media (max-width: 768px) {
          overflow: initial!important;
        }
        div {
          .main-logo {
            max-height: 75px;
          }
        }
      }

      .nav-item {
        &:hover {
          box-shadow: inset 0.1875rem 0 0 #3ab137 !important;
        }

        .nav-link {
          display: flex;
          text-align: initial!important;

          &:hover {
            box-shadow: inset 0.1875rem 0 0 #3ab137 !important;
          }
        }
      }
    }
  }

  .themed__link {
    font-family: 'Ubuntu', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400 !important;

    &:hover {
      color: #3ab137 !important;

      .item-icon-wrapper > i {
        color: #3ab137 !important;
      }
    }

    &.is-active-link {
      box-shadow: inset 0.1875rem 0 0 #3ab137 !important;

      span {
        color: #3ab137 !important;
        font-weight: 500;
      }

      .item-icon-wrapper > i {
        color: #3ab137 !important;
      }
    }
  }
</style>
