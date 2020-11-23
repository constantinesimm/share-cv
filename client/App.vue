<template>
  <component id="app" :is="layout" :class="layout">
    <transition name="el-zoom-in-center">

      <router-view />

    </transition>
  </component>
</template>

<script>

  export default {
    name: 'App',
    computed: {
      layout() {
        return `${ this.$route.meta.layout }Layout`
      }
    }
  }
</script>

<style lang="scss">
  #app {
    height: 100vh;
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
