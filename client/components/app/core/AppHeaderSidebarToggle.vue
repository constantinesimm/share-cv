<template>
  <nav class="nav">
    <div @click="handleClick()" class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center">
      <i class="material-icons">&#xE5D2;</i>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'AppHeaderSidebarToggle',
    methods: {
      handleClick() {
        this.$eventHub.$emit('toggle-sidebar')
      }
    }
  }
</script>
