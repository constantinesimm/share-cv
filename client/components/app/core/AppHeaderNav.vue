<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">2</d-badge>
        </div>
      </a>
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Analytics</span>
            <p>Your website’s active users count increased by <span class="text-success text-semibold">28%</span> in the last week. Great job!</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item href="#">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE8D1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Sales</span>
            <p>Last week your store’s sales count decreased by <span class="text-danger text-semibold">5.52%</span>. It could have been worse!</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center">View all Notifications</d-dropdown-item>
      </d-collapse>
    </li>
    <li class="nav-item dropdown d-flex align-items-center pl-2 pr-2">
      <el-dropdown @command="() => true">
        <div class="el-dropdown-link d-flex align-items-center">
          <el-avatar class="user-avatar rounded-circle mr-2">
            avatar
          </el-avatar>
          <span class="d-none d-md-inline-block dropdown-menu__link">
            username
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="far fa-id-card" command="profile">Профиль</el-dropdown-item>
          <el-dropdown-item icon="fas fa-cogs" command="app-settings" disabled>Настройки</el-dropdown-item>
          <el-dropdown-item class="text-danger" icon="fas fa-sign-out-alt" command="logout" divided>Выход</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </li>
  </d-navbar-nav>
</template>

<script>
  export default {
    name: 'AppHeaderNav',
      data() {
        return {}
      },
  }
</script>

<style lang="scss" scoped>
.nav-link:hover {
  cursor: pointer;
}
.dropdown-menu__link {
  color: #3D5170;
  font-weight: 400!important;

  &:hover {
    opacity: .7;
  }
}
.el-dropdown-menu__item {
  &:hover {
    color: #3ab137;
    text-decoration: none;
  }
}
</style>
